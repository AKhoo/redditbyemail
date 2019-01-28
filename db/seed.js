const db = require('./config');
const User = require('./user');

// const defaultSubs = [
//   {
//     _id: 'Interesting Facts',
//     subs: [
//       { _id: 'ExplainLikeImFive' },
//       { _id: 'Wikipedia' },
//       { _id: 'TodayILearned' }],
//   },
//   {
//     _id: 'Business & Technology',
//     subs: [
//       { _id: 'Business' },
//       { _id: 'Gadgets' },
//       { _id: 'Futurology' },
//       { _id: 'Technology' }],
//   },
//   {
//     _id: 'Science',
//     subs: [
//       { _id: 'Science' },
//       { _id: 'History' },
//       { _id: 'Philosophy' },
//       { _id: 'Economics' },
//       { _id: 'Psychology' },
//       { _id: 'Space' },
//       { _id: 'Engineering' }],
//   },
//   {
//     _id: 'Quotes',
//     subs: [
//       { _id: 'Quotes' },
//       { _id: 'QuotesPorn' }],
//   },
//   {
//     _id: 'Entertaining Reads',
//     subs: [
//       { _id: 'AskReddit' },
//       { _id: 'WritingPrompts' }],
//   },
//   {
//     _id: 'JavaScript',
//     subs: [
//       { _id: 'JavaScript' },
//       { _id: 'WebDev' },
//       { _id: 'DailyProgrammer' },
//       { _id: 'FrontEnd' },
//       { _id: 'Node' },
//       { _id: 'ReactJS' },
//       { _id: 'Web_Design' }],
//   },
//   {
//     _id: 'Life Hacks',
//     subs: [
//       { _id: 'LifeProTips' },
//       { _id: 'Lifehacks' }],
//   },
//   {
//     _id: 'Personal Finance',
//     subs: [
//       { _id: 'PersonalFinance' },
//       { _id: 'Investing' }],
//   },
//   {
//     _id: 'Self Improvement',
//     subs: [
//       { _id: 'GetMotivated' },
//       { _id: 'ZenHabits' },
//       { _id: 'Productivity' },
//       { _id: 'SelfImprovement' }],
//   },
//   {
//     _id: 'Worth Watching',
//     subs: [
//       { _id: 'Documentaries' },
//       { _id: 'NetflixBestOf' }],
//   },
//   {
//     _id: 'Recipes',
//     subs: [
//       { _id: 'Recipes' },
//       { _id: 'GifRecipes' }],
//   },
// ];

const defaultSubs = [
  {
    name: 'Interesting Facts',
    subCollection: 'ExplainLikeImFive TodayILearned Wikipedia',
  },
  {
    name: 'Business & Technology',
    subCollection: 'Business Futurology Gadgets Technology',
  },
  {
    name: 'Science',
    subCollection: 'Economics Engineering History Philosophy Psychology Science Space',
  },
  {
    name: 'Quotes',
    subCollection: 'Quotes QuotesPorn',
  },
  {
    name: 'Entertaining Reads',
    subCollection: 'AskReddit WritingPrompts',
  },
  {
    name: 'JavaScript',
    subCollection: 'DailyProgrammer FrontEnd JavaScript Node ReactJS WebDev Web_Design',
  },
  {
    name: 'Life Hacks',
    subCollection: 'Lifehacks LifeProTips',
  },
  {
    name: 'Personal Finance',
    subCollection: 'Investing PersonalFinance',
  },
  {
    name: 'Self Improvement',
    subCollection: 'GetMotivated Productivity SelfImprovement ZenHabits',
  },
  {
    name: 'Worth Watching',
    subCollection: 'Documentaries NetflixBestOf',
  },
  {
    name: 'Recipes',
    subCollection: 'GifRecipes Recipes',
  },
];

// Creates a default user which gets queried by the web site
User.add({
  email: 'adriankhoo.ca+redditdefault@gmail.com',
  customCategories: defaultSubs,
});