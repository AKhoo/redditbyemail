const db = require('./config');
const User = require('./user');

const getPosts = (userEmail, callback) => {
  User.getPostsBySub(userEmail, callback);
};

module.exports = { getPosts };
