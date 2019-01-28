const axios = require('axios');
const async = require('async');
const Bottleneck = require('bottleneck');
const db = require('./config');

// Get all unique subs (need to also maintain unique sub list)
  // collection: users
  // collection: subcollections <-- contains all reading material for each unique subcollection
  // collection: subs <-- primary store updated from reddit daily (store top 5). then populated down to subcollections
    // for each sub, ping reddit with a max rate (using async library)
    // for each subCollection, get posts from subs, sort and store top 5
// For each category, update subcollection posts with posts from unique subs

const apiController = new Bottleneck({
  minTime: 2000,
});

apiController.on('retry', (error, jobinfo) => {
  console.log('Retrying failed API call', jobinfo.retryCount);
});

// If API call fails, try again in 2 seconds
apiController.on('failed', (error, jobinfo) => {
  return 2000;
});

const getPostsFromReddit = apiController.wrap(sub => axios.get(`https://www.reddit.com/r/${sub}/top.json?limit=5`));

let successCount = 0;
let subCount;
db.Sub.find({})
  .then((subs) => {
    subCount = subs.length;
    for (let i = 0; i < subCount; i += 1) {
      getPostsFromReddit(subs[i]._id)
        .then(({ data }) => {
          const posts = [];
          if (data.data.children) {
            data.data.children.forEach((post) => {
              posts.push({
                _id: post.data.id,
                title: post.data.title,
                url: post.data.url,
                permalink: post.data.permalink,
                ups: post.data.ups,
                selftext: post.data.selftext,
              })
            })
            console.log(`Success - Got ${posts.length} posts from Reddit for ${subs[i]._id}`);
          }
          return posts;
        })
        .then(posts => db.Sub.findOneAndUpdate(
          { _id: subs[i]._id },
          { posts },
        ))
        .then(() => {
          console.log('Success - Updated sub in DB');
          successCount += 1;
          console.log(successCount, subCount);
          if (successCount === subCount) {
            console.log('DONE');
            updateSubCollections();
          }
        })
        .catch(err => console.log(err));
    }
  });

const updateSubCollection = (subCollId, updateNextSubColl) => {
  // For each sub in the collection...
  console.log('Updating subCollection', subCollId);
  const subs = subCollId.split(' ');
  let allPosts = [];
  const dbOps = [];
  subs.forEach((sub) => {
    dbOps.push((updateNextSub) => {
      console.log('Updating sub', sub);
      db.Sub.find({ _id: sub })
        .then((data) => {
          allPosts = allPosts.concat(data[0].posts);
        })
        .then(() => updateNextSub())
        .catch(err => console.log(err));
    });
  });
  dbOps.push((doneSubColl) => {
    allPosts = allPosts.sort((postA, postB) => postB.ups - postA.ups);
    console.log(allPosts[0]);
    db.SubCollection.findOneAndUpdate(
      { _id: subCollId },
      { subs: allPosts },
    )
      .then(() => doneSubColl())
      .catch(err => console.log(err));
  });
  dbOps.push(() => updateNextSubColl());
  console.log(dbOps.length);
  async.series(dbOps);
};

// For each category, update subcollection posts with posts from unique subs
const updateSubCollections = () => {
  db.SubCollection.find({}, '_id')
    .then((subColls) => {
      const dbOps = [];
      subColls.forEach((subColl) => {
        dbOps.push(updateNextSubColl => updateSubCollection(subColl._id, updateNextSubColl));
      });
      async.series(dbOps);
    })
    .catch(err => console.log(err));
};
