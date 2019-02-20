const mongoose = require('mongoose');
const db = require('./config');
const async = require('async');


const customCategory = mongoose.Schema({
  name: String,
  subCollection: String,
});

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    validate: {
      validator: (value) => {
        return new Promise((resolve, reject) => {
          User.count({email: value}, (err, results) => {
            if (results === 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
      },
      message: props => `${props.value} is not a unique email.`,
    },
  },
  customCategories: [customCategory],
});

const User = mongoose.model('User', userSchema);

User.getAll = (callback) => {
  User.find({}).then(data => callback(data));
};

User.add = (object, callback) => {
  User.create(object)
    .then((userResult) => {
      console.log('Success - user create', userResult);
      callback();
      if (object.customCategories) {
        // Create subCollections that don't exist
        object.customCategories.forEach((category) => {
          const subs = [];
          category.subCollection.split(' ').forEach((sub) => {
            subs.push({
              _id: sub,
            });
          });
          if (subs.length) {
            db.SubCollection.findOneAndUpdate(
              { _id: category.subCollection },
              { _id: category.subCollection, subs },
              { upsert: true },
            )
              .then((subCollResult) => {
                console.log('Success - subCollection findOneAndUpdate');
                if (!subCollResult) {
                  // Create subs that don't exist
                  subs.forEach((sub) => {
                    db.Sub.findOneAndUpdate(
                      { _id: sub },
                      { _id: sub },
                      { upsert: true },
                    )
                      .then(() => console.log('Success - Sub findOneAndUpdate:'))
                      .catch(subErr => console.log('Error - Sub findOneAndUpdate:', subErr));
                  });
                }
              })
              .catch(subCollErr => console.log('Error - subCollection findOneAndUpdate', subCollErr));
          }
        });
      }
    })
    .catch((userErr) => {
      console.log('Error - user create', userErr);
    });
};

User.getPostsBySubCollection = (email, callback) => {
  const dbOps = [];
  const allPosts = {};
  User.findOne({ email })
    .then(({ customCategories }) => {
      customCategories.forEach((category) => {
        dbOps.push((getNextSubColl) => {
          console.log('getting posts for', category.subCollection);
          db.SubCollection.findOne({ _id: category.subCollection }, { posts: true })
            .then(({ posts }) => {
              allPosts[category.name] = posts.slice(0, 4);
              getNextSubColl();
            })
            .catch(err => console.log(err));
        });
      });
      dbOps.push(() => callback(allPosts));
      async.series(dbOps);
    });
};

User.getPostsBySub = (email, callback) => {
  const dbOps = [];
  const allPosts = {};
  User.findOne({ email })
    .then(({ customCategories }) => {
      customCategories.forEach((category) => {
        const subs = category.subCollection.split(' ');
        subs.forEach((subName) => {
          dbOps.push((getNextSub) => {
            console.log('getting posts for', subName);
            db.Sub.findOne({ _id: subName })
              .then(({ posts }) => {
                allPosts[subName] = posts;
                getNextSub();
              })
              .catch(err => console.log(err));
          });
        });
      });
      dbOps.push(() => callback(allPosts));
      async.series(dbOps);
    });
};

module.exports = User;
