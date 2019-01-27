const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reddit');

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

const customCategorySchema = mongoose.Schema({
  _id: String,
  subs: [subSchema],
});

const Post = mongoose.model('Post', postSchema);
const Sub = mongoose.model('Sub', subSchema);
const CustomCategory = mongoose.model('CustomCategory', customCategorySchema);

module.exports = { CustomCategory, Post, Sub };
