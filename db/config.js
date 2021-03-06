const mongoose = require('mongoose');
const env = require('../.env');
mongoose.connect(process.env.mongoUrl || env.mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const postSchema = mongoose.Schema({
  _id: String,
  title: String,
  url: String,
  permalink: String,
  ups: Number,
  selftext: String,
  metatext: String,
});

const subSchema = mongoose.Schema({
  _id: String,
  posts: [postSchema],
});

const subCollectionSchema = mongoose.Schema({
  _id: String,
  posts: [postSchema],
});

const Post = mongoose.model('Post', postSchema);
const Sub = mongoose.model('Sub', subSchema);
const SubCollection = mongoose.model('SubCollection', subCollectionSchema);

module.exports = { SubCollection, Post, Sub };
