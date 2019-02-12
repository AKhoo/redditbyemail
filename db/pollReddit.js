const axios = require('axios');
const Bottleneck = require('bottleneck');
const db = require('./config');
const updateSubCollections = require('./updateSubCollections');

module.exports.handler = (event, context) => {
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
};
