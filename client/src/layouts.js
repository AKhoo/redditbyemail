const returnCategoriesByPath = (path) => {
  if (window.location.pathname === '/businessandtech') {
    return businessAndTech;
  } else if (window.location.pathname === '/science') {
    return defaultCategories;
  } else if (window.location.pathname === '/psychology') {
    return defaultCategories;
  } else if (window.location.pathname === '/space') {
    return defaultCategories;
  } else if (window.location.pathname === '/javascript') {
    return defaultCategories;
  } else if (window.location.pathname === '/gadgets') {
    return defaultCategories;
  } else if (window.location.pathname === '/facinating') {
    return defaultCategories;
  } else if (window.location.pathname === '/shortstories') {
    return defaultCategories;
  } else {
    return defaultCategories;
  }
};

const defaultCategories = {
  'Interesting Facts': {
    name: 'Interesting Facts',
    checked: true,
    order: 1,
    subs: {
      'TodayILearned': true,
      'ExplainLikeImFive': true,
      'Wikipedia': true,
    },
  },
  'Business & Technology': {
    name: 'Business & Technology',
    checked: true,
    order: 2,
    subs: {
      'Business': true,
      'Futurology': true,
      'Gadgets': true,
      'Technology': true,
    }
  },
  'Science & Economics': {
    name: 'Science & Economics',
    checked: true,
    order: 3,
    subs: {
      'Economics': true,
      'Engineering': true,
      'History': true,
      'Philosophy': true,
      'Psychology': true,
      'Science': true,
      'Space': true,
    }
  },
  'Shows & Documentaries': {
    name: 'Shows & Documentaries',
    checked: true,
    order: 4,
    subs: {
      'Documentaries': true,
      'NetflixBestOf': true,
    }
  },
  'Entertaining Reads': {
    name: 'Entertaining Reads',
    checked: true,
    order: 5,
    subs: {
      'BestOf': true,
      'AskReddit': true,
      'WritingPrompts': true,
    }
  },
  'Quotes': {
    name: 'Quotes',
    checked: true,
    order: 6,
    subs: {
      'Quotes': true,
      'QuotesPorn': true,
    }
  },
  'JavaScript': {
    name: 'JavaScript',
    checked: true,
    order: 7,
    subs: {
      'DailyProgrammer': true,
      'FrontEnd': true,
      'JavaScript': true,
      'Node': true,
      'ReactJS': true,
      'WebDev': true,
      'Web_Design': true,
    }
  },
  'Life Hacks': {
    name: 'Life Hacks',
    checked: true,
    order: 8,
    subs: {
      'Lifehacks': true,
      'LifeProTips': true,
    }
  },
  'Personal Finance': {
    name: 'Personal Finance',
    checked: true,
    order: 9,
    subs: {
      'Investing': true,
      'PersonalFinance': true,
      'FinancialIndependence': true,
    }
  },
  'Self Improvement': {
    name: 'Self Improvement',
    checked: true,
    order: 10,
    subs: {
      'GetMotivated': true,
      'Productivity': true,
      'SelfImprovement': true,
      'ZenHabits': true,
    }
  },
  'Recipes': {
    name: 'Recipes',
    checked: true,
    order: 11,
    subs: {
      'GifRecipes': true,
      'Recipes': true,
    }
  },
}

const businessAndTech = {
  'Business & Technology': {
    name: 'Business & Technology',
    checked: true,
    order: 1,
    subs: {
      'Business': true,
      'Futurology': false,
      'Gadgets': false,
      'Technology': true,
    }
  },
  'Science & Economics': {
    name: 'Science & Economics',
    checked: true,
    order: 2,
    subs: {
      'Economics': true,
      'Engineering': false,
      'History': false,
      'Philosophy': false,
      'Psychology': false,
      'Science': false,
      'Space': false,
    }
  },
  'Interesting Facts': {
    name: 'Interesting Facts',
    checked: true,
    order: 3,
    subs: {
      'TodayILearned': false,
      'ExplainLikeImFive': true,
      'Wikipedia': true,
    },
  },
  'Shows & Documentaries': {
    name: 'Shows & Documentaries',
    checked: true,
    order: 4,
    subs: {
      'Documentaries': true,
      'NetflixBestOf': false,
    }
  },
  'Personal Finance': {
    name: 'Personal Finance',
    checked: true,
    order: 5,
    subs: {
      'Investing': true,
      'PersonalFinance': true,
      'FinancialIndependence': true,
    }
  },
  'Entertaining Reads': {
    name: 'Entertaining Reads',
    checked: true,
    order: 6,
    subs: {
      'BestOf': true,
      'AskReddit': true,
      'WritingPrompts': true,
    }
  },
  'JavaScript': {
    name: 'JavaScript',
    checked: true,
    order: 7,
    subs: {
      'DailyProgrammer': true,
      'FrontEnd': true,
      'JavaScript': true,
      'Node': true,
      'ReactJS': true,
      'WebDev': true,
      'Web_Design': true,
    }
  },
  'Self Improvement': {
    name: 'Self Improvement',
    checked: true,
    order: 8,
    subs: {
      'GetMotivated': true,
      'Productivity': true,
      'SelfImprovement': true,
      'ZenHabits': true,
    }
  },
  'Life Hacks': {
    name: 'Life Hacks',
    checked: true,
    order: 9,
    subs: {
      'Lifehacks': true,
      'LifeProTips': true,
    }
  },
  'Quotes': {
    name: 'Quotes',
    checked: true,
    order: 10,
    subs: {
      'Quotes': true,
      'QuotesPorn': true,
    }
  },
  'Recipes': {
    name: 'Recipes',
    checked: true,
    order: 11,
    subs: {
      'GifRecipes': true,
      'Recipes': true,
    }
  },
}

export default returnCategoriesByPath;
