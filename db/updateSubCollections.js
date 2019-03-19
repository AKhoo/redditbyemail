const async = require('async');
const aws = require('aws-sdk');
const db = require('./config');

const lambda = new aws.Lambda({
  region: 'us-east-1',
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
      async.series(dbOps, () => {
        lambda.invoke({
          FunctionName: process.env.sendEmailsFunction || 'redditByEmail-dev-sendEmails',
          InvocationType: 'Event',
        }, (error, data) => {
          if (error) {
            console.log('error', error);
          }
          if (data.Payload) {
            console.log(`Lambda function invoked: ${process.env.sendEmailsFunction || 'redditByEmail-dev-sendEmails'}`);
          }
          callback();
        });
      });
    })
    .catch(err => console.log(err));
};

module.exports = updateSubCollections;
