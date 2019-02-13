const db = require('./config');
const async = require('async');


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
    db.SubCollection.findOneAndUpdate(
      { _id: subCollId },
      { posts: allPosts },
    )
      .then(() => doneSubColl())
      .catch(err => console.log(err));
  });
  dbOps.push(() => updateNextSubColl());
  async.series(dbOps);
};

// For each category, update subcollection posts with posts from unique subs
const updateSubCollections = (callback) => {
  db.SubCollection.find({}, '_id')
    .then((subColls) => {
      const dbOps = [];
      subColls.forEach((subColl) => {
        dbOps.push(updateNextSubColl => updateSubCollection(subColl._id, updateNextSubColl));
      });
      async.series(dbOps, callback);
    })
    .catch(err => console.log(err));
};

module.exports = updateSubCollections;
