const axios = require('axios');
const db = require('./config');

// Get all unique subs (need to also maintain unique sub list)
  // collection: users
  // collection: subcollections <-- contains all reading material for each unique subcollection
  // collection: subs <-- primary store updated from reddit daily (store top 5). then populated down to subcollections
    // for each sub, ping reddit with a max rate (using async library)
    // for each subCollection, get posts from subs, sort and store top 5
// For each category, update subcollection posts with posts from unique subs
db.CustomCategory.find({});
