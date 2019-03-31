const db = require('./config');
const User = require('./user');

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
    subCollection: 'BestOf AskReddit WritingPrompts',
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
    subCollection: 'Investing PersonalFinance FinancialIndependence',
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
}, () => {});
