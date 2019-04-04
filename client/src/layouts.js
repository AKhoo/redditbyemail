const returnCategoriesByPath = (path) => {
  if (window.location.pathname === '/businessandtech') {
    return businessAndTech;
  } else if (window.location.pathname === '/science') {
    return science;
  } else if (window.location.pathname === '/psychology') {
    return psychology;
  } else if (window.location.pathname === '/space') {
    return space;
  } else if (window.location.pathname === '/javascript') {
    return javascript;
  } else if (window.location.pathname === '/gadgets') {
    return gadgets;
  } else if (window.location.pathname === '/fascinating') {
    return fascinating;
  } else if (window.location.pathname === '/shortstories') {
    return shortstories;
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
      'TodayILearned': false,
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
  'Entertaining Reads': {
    name: 'Entertaining Reads',
    checked: true,
    order: 3,
    subs: {
      'BestOf': true,
      'AskReddit': true,
      'WritingPrompts': false,
    }
  },
  'Science & Economics': {
    name: 'Science & Economics',
    checked: true,
    order: 4,
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
    order: 5,
    subs: {
      'Documentaries': true,
      'NetflixBestOf': true,
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
  'Recipes': {
    name: 'Recipes',
    checked: true,
    order: 10,
    subs: {
      'GifRecipes': true,
      'Recipes': true,
    }
  },
  'Self Improvement': {
    name: 'Self Improvement',
    checked: false,
    order: 11,
    subs: {
      'GetMotivated': false,
      'Productivity': false,
      'SelfImprovement': false,
      'ZenHabits': false,
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
  'Life Hacks': {
    name: 'Life Hacks',
    checked: true,
    order: 6,
    subs: {
      'Lifehacks': true,
      'LifeProTips': true,
    }
  },
  'Entertaining Reads': {
    name: 'Entertaining Reads',
    checked: true,
    order: 7,
    subs: {
      'BestOf': true,
      'AskReddit': true,
      'WritingPrompts': true,
    }
  },
  'Quotes': {
    name: 'Quotes',
    checked: true,
    order: 8,
    subs: {
      'Quotes': true,
      'QuotesPorn': true,
    }
  },
  'JavaScript': {
    name: 'JavaScript',
    checked: true,
    order: 9,
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
  'Recipes': {
    name: 'Recipes',
    checked: true,
    order: 10,
    subs: {
      'GifRecipes': true,
      'Recipes': true,
    }
  },
  'Self Improvement': {
    name: 'Self Improvement',
    checked: false,
    order: 11,
    subs: {
      'GetMotivated': false,
      'Productivity': false,
      'SelfImprovement': false,
      'ZenHabits': false,
    }
  },
}

const science = {
  'Science & Economics': {
    name: 'Science & Economics',
    checked: true,
    order: 1,
    subs: {
      'Economics': false,
      'Engineering': false,
      'History': false,
      'Philosophy': false,
      'Psychology': false,
      'Science': true,
      'Space': false,
    }
  },
  'Interesting Facts': {
    name: 'Interesting Facts',
    checked: true,
    order: 2,
    subs: {
      'TodayILearned': false,
      'ExplainLikeImFive': true,
      'Wikipedia': true,
    },
  },
  'Business & Technology': {
    name: 'Business & Technology',
    checked: true,
    order: 3,
    subs: {
      'Business': true,
      'Futurology': false,
      'Gadgets': false,
      'Technology': true,
    }
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

const space = {
  'Science & Economics': {
    name: 'Science & Economics',
    checked: true,
    order: 1,
    subs: {
      'Economics': false,
      'Engineering': false,
      'History': false,
      'Philosophy': false,
      'Psychology': false,
      'Science': false,
      'Space': true,
    }
  },
  'Interesting Facts': {
    name: 'Interesting Facts',
    checked: true,
    order: 2,
    subs: {
      'TodayILearned': false,
      'ExplainLikeImFive': true,
      'Wikipedia': true,
    },
  },
  'Business & Technology': {
    name: 'Business & Technology',
    checked: true,
    order: 3,
    subs: {
      'Business': true,
      'Futurology': false,
      'Gadgets': false,
      'Technology': true,
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
  'Personal Finance': {
    name: 'Personal Finance',
    checked: true,
    order: 6,
    subs: {
      'Investing': true,
      'PersonalFinance': true,
      'FinancialIndependence': true,
    }
  },
  'Life Hacks': {
    name: 'Life Hacks',
    checked: true,
    order: 7,
    subs: {
      'Lifehacks': true,
      'LifeProTips': true,
    }
  },
  'Quotes': {
    name: 'Quotes',
    checked: true,
    order: 8,
    subs: {
      'Quotes': true,
      'QuotesPorn': true,
    }
  },
  'JavaScript': {
    name: 'JavaScript',
    checked: true,
    order: 9,
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
  'Recipes': {
    name: 'Recipes',
    checked: true,
    order: 10,
    subs: {
      'GifRecipes': true,
      'Recipes': true,
    }
  },
  'Self Improvement': {
    name: 'Self Improvement',
    checked: false,
    order: 11,
    subs: {
      'GetMotivated': false,
      'Productivity': false,
      'SelfImprovement': false,
      'ZenHabits': false,
    }
  },
}

const psychology = {
  'Science & Economics': {
    name: 'Science & Economics',
    checked: true,
    order: 1,
    subs: {
      'Economics': false,
      'Engineering': false,
      'History': false,
      'Philosophy': false,
      'Psychology': true,
      'Science': false,
      'Space': false,
    }
  },
  'Interesting Facts': {
    name: 'Interesting Facts',
    checked: true,
    order: 2,
    subs: {
      'TodayILearned': false,
      'ExplainLikeImFive': true,
      'Wikipedia': true,
    },
  },
  'Business & Technology': {
    name: 'Business & Technology',
    checked: true,
    order: 3,
    subs: {
      'Business': true,
      'Futurology': false,
      'Gadgets': false,
      'Technology': true,
    }
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
  'Personal Finance': {
    name: 'Personal Finance',
    checked: true,
    order: 6,
    subs: {
      'Investing': true,
      'PersonalFinance': true,
      'FinancialIndependence': true,
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

const javascript = {
  'JavaScript': {
    name: 'JavaScript',
    checked: true,
    order: 1,
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
  'Business & Technology': {
    name: 'Business & Technology',
    checked: true,
    order: 2,
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
  'Interesting Facts': {
    name: 'Interesting Facts',
    checked: true,
    order: 4,
    subs: {
      'TodayILearned': false,
      'ExplainLikeImFive': true,
      'Wikipedia': true,
    },
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
  'Shows & Documentaries': {
    name: 'Shows & Documentaries',
    checked: true,
    order: 7,
    subs: {
      'Documentaries': true,
      'NetflixBestOf': false,
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
  'Quotes': {
    name: 'Quotes',
    checked: true,
    order: 9,
    subs: {
      'Quotes': true,
      'QuotesPorn': true,
    }
  },
  'Recipes': {
    name: 'Recipes',
    checked: true,
    order: 10,
    subs: {
      'GifRecipes': true,
      'Recipes': true,
    }
  },
  'Self Improvement': {
    name: 'Self Improvement',
    checked: false,
    order: 11,
    subs: {
      'GetMotivated': false,
      'Productivity': false,
      'SelfImprovement': false,
      'ZenHabits': false,
    }
  },
}

const gadgets = {
    'Business & Technology': {
      name: 'Business & Technology',
      checked: true,
      order: 1,
      subs: {
        'Business': false,
        'Futurology': false,
        'Gadgets': true,
        'Technology': false,
      }
    },
    'Interesting Facts': {
      name: 'Interesting Facts',
      checked: true,
      order: 2,
      subs: {
        'TodayILearned': true,
        'ExplainLikeImFive': true,
        'Wikipedia': true,
      },
    },
    'Entertaining Reads': {
      name: 'Entertaining Reads',
      checked: true,
      order: 3,
      subs: {
        'BestOf': true,
        'AskReddit': true,
        'WritingPrompts': true,
      }
    },
    'Science & Economics': {
      name: 'Science & Economics',
      checked: true,
      order: 4,
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
    'Quotes': {
      name: 'Quotes',
      checked: true,
      order: 5,
      subs: {
        'Quotes': true,
        'QuotesPorn': true,
      }
    },
    'Life Hacks': {
      name: 'Life Hacks',
      checked: true,
      order: 6,
      subs: {
        'Lifehacks': true,
        'LifeProTips': true,
      }
    },
    'Shows & Documentaries': {
      name: 'Shows & Documentaries',
      checked: true,
      order: 7,
      subs: {
        'Documentaries': true,
        'NetflixBestOf': true,
      }
    },
    'JavaScript': {
    name: 'JavaScript',
    checked: true,
    order: 8,
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
  'Recipes': {
    name: 'Recipes',
    checked: true,
    order: 9,
    subs: {
      'GifRecipes': true,
      'Recipes': true,
    }
  },
  'Personal Finance': {
    name: 'Personal Finance',
    checked: false,
    order: 10,
    subs: {
      'Investing': false,
      'PersonalFinance': false,
      'FinancialIndependence': false,
    }
  },
  'Self Improvement': {
    name: 'Self Improvement',
    checked: false,
    order: 11,
    subs: {
      'GetMotivated': false,
      'Productivity': false,
      'SelfImprovement': false,
      'ZenHabits': false,
    }
  },
}

const fascinating = {
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
  'Entertaining Reads': {
    name: 'Entertaining Reads',
    checked: true,
    order: 2,
    subs: {
      'BestOf': true,
      'AskReddit': true,
      'WritingPrompts': false,
    }
  },
  'Business & Technology': {
    name: 'Business & Technology',
    checked: true,
    order: 3,
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
    order: 4,
    subs: {
      'Economics': false,
      'Engineering': false,
      'History': false,
      'Philosophy': false,
      'Psychology': false,
      'Science': true,
      'Space': false,
    }
  },
  'Quotes': {
    name: 'Quotes',
    checked: true,
    order: 5,
    subs: {
      'Quotes': true,
      'QuotesPorn': true,
    }
  },
  'Life Hacks': {
    name: 'Life Hacks',
    checked: true,
    order: 6,
    subs: {
      'Lifehacks': true,
      'LifeProTips': true,
    }
  },
  'Shows & Documentaries': {
    name: 'Shows & Documentaries',
    checked: true,
    order: 7,
    subs: {
      'Documentaries': true,
      'NetflixBestOf': true,
    }
  },
  'Personal Finance': {
    name: 'Personal Finance',
    checked: true,
    order: 8,
    subs: {
      'Investing': true,
      'PersonalFinance': true,
      'FinancialIndependence': true,
    }
  },
  'JavaScript': {
    name: 'JavaScript',
    checked: true,
    order: 9,
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
'Recipes': {
  name: 'Recipes',
  checked: true,
  order: 10,
  subs: {
    'GifRecipes': true,
    'Recipes': true,
  }
},
'Self Improvement': {
  name: 'Self Improvement',
  checked: false,
  order: 11,
  subs: {
    'GetMotivated': false,
    'Productivity': false,
    'SelfImprovement': false,
    'ZenHabits': false,
  }
},
}

const shortstories = {
  'Entertaining Reads': {
    name: 'Entertaining Reads',
    checked: true,
    order: 1,
    subs: {
      'BestOf': false,
      'AskReddit': false,
      'WritingPrompts': true,
    }
  },
  'Interesting Facts': {
    name: 'Interesting Facts',
    checked: true,
    order: 2,
    subs: {
      'TodayILearned': false,
      'ExplainLikeImFive': true,
      'Wikipedia': true,
    },
  },
  'Business & Technology': {
    name: 'Business & Technology',
    checked: true,
    order: 3,
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
    order: 4,
    subs: {
      'Economics': false,
      'Engineering': false,
      'History': false,
      'Philosophy': false,
      'Psychology': false,
      'Science': true,
      'Space': false,
    }
  },
  'Life Hacks': {
    name: 'Life Hacks',
    checked: true,
    order: 5,
    subs: {
      'Lifehacks': true,
      'LifeProTips': true,
    }
  },
  'Shows & Documentaries': {
    name: 'Shows & Documentaries',
    checked: true,
    order: 6,
    subs: {
      'Documentaries': true,
      'NetflixBestOf': true,
    }
  },
  'Quotes': {
    name: 'Quotes',
    checked: true,
    order: 7,
    subs: {
      'Quotes': true,
      'QuotesPorn': true,
    }
  },
  'Personal Finance': {
    name: 'Personal Finance',
    checked: true,
    order: 8,
    subs: {
      'Investing': true,
      'PersonalFinance': true,
      'FinancialIndependence': true,
    }
  },
  'JavaScript': {
    name: 'JavaScript',
    checked: true,
    order: 9,
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
'Recipes': {
  name: 'Recipes',
  checked: true,
  order: 10,
  subs: {
    'GifRecipes': true,
    'Recipes': true,
  }
},
'Self Improvement': {
  name: 'Self Improvement',
  checked: false,
  order: 11,
  subs: {
    'GetMotivated': false,
    'Productivity': false,
    'SelfImprovement': false,
    'ZenHabits': false,
  }
},
}

export default returnCategoriesByPath;
