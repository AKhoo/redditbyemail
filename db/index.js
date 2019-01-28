const db = require('./config');
const User = require('./user');

const getPosts = (userEmail, callback) => {
  User.getPosts(userEmail, callback);
};

module.exports = { getPosts };
