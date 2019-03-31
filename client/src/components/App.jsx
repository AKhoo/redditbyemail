import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import ListCategory from './ListCategory.jsx'
import Subscribe from './Subscribe.jsx'
import Email from './Email.jsx'

const styles = theme => ({
  layout: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 6,
    [theme.breakpoints.up('md')]: {
      width: 750,
    }
  },
  subheader: {
    marginBottom: 30,
  },
  checkAll: {
    height: 25,
    paddingBottom: 0
  },
  checkAllText: {
    paddingLeft: 15,
    fontSize: '0.7 rem',
    color: 'grey'
  },
  footerText: {
    color: 'grey'
  },
  heroButton: {
    marginLeft: 5,
    marginRight: 5
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      subscribed: false,
      categories: {
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
        'Science': {
          name: 'Science',
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
        'Worth Watching': {
          name: 'Worth Watching',
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
      },
      posts: {},
      display: {},
      mobileDrawerOpen: false,
      subscribeModalOpen: false,
      checkAll: false,
    }
    this.apiUrl = window.location.host === 'redditbyemail.com' ? 'https://z2dxzzhyca.execute-api.us-east-1.amazonaws.com/prod/api' : 'https://vsjd9kzss0.execute-api.us-east-1.amazonaws.com/dev/api';
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSubClick = this.handleSubClick.bind(this);
    this.showTopPosts = this.showTopPosts.bind(this);
    this.openMobileDrawer = this.openMobileDrawer.bind(this);
    this.closeMobileDrawer = this.closeMobileDrawer.bind(this);
    this.openSubscribeModal = this.openSubscribeModal.bind(this);
    this.closeSubscribeModal = this.closeSubscribeModal.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleReorder = this.handleReorder.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  componentDidMount() {
    this.getPosts();
    let drawerOpen = true;
    if (window.innerWidth < 960)
    this.setState({
      mobileDrawerOpen: true
    })
  }

  getPosts() {
    axios.get(`${this.apiUrl}/posts`)
      .then(({ data }) => this.setState({ posts : data }, this.showTopPosts));
  }
  
  showTopPosts() {
    const display = {};
    const categoriesAvailable = this.state.categories;
    // For each category, combine and store sorted posts
    Object.keys(categoriesAvailable).forEach(category => {
      let allPosts = [];
      Object.keys(categoriesAvailable[category].subs).forEach(sub => {
        if (this.state.posts[sub]) {
          if (categoriesAvailable[category].subs[sub]) {
            allPosts = allPosts.concat(this.state.posts[sub]);
          }
        }
      });
      allPosts = allPosts.sort((postA, postB) => {
        return postB.ups - postA.ups;
      });
      if (allPosts.length) {
        display[category] = allPosts.slice(0, 5); // Only display top 5 of each category
      }
    });
    this.setState({display});
  }

  openMobileDrawer() {
    this.setState({
      mobileDrawerOpen: true
    });
  }

  closeMobileDrawer() {
    this.setState({
      mobileDrawerOpen: false
    });
  }

  openSubscribeModal() {
    this.setState({
      subscribeModalOpen: true
    });
  }

  closeSubscribeModal() {
    this.setState({
      subscribeModalOpen: false
    });
  }

  handleCategoryClick(e) {
    if (e.target.tagName !== 'svg') {
      const cat = e.currentTarget.childNodes[1].textContent;
      const categories = JSON.parse(JSON.stringify(this.state.categories));
      // Toggle checked value
      categories[cat].checked = !categories[cat].checked;
      // Set child subs' checked values to same
      Object.keys(categories[cat].subs).forEach(sub => {
        categories[cat].subs[sub] = categories[cat].checked;
      });
      this.setState({categories}, this.showTopPosts);
    }
  }

  handleSubClick(e) {
    const subName = e.currentTarget.childNodes[1].textContent;
    const catName = e.currentTarget.parentNode.childNodes[0].childNodes[1].textContent;
    this.setState((state) => {
      const newState = JSON.parse(JSON.stringify(state));
      const clickedCategory = newState.categories[catName];
      clickedCategory.subs[subName] = !clickedCategory.subs[subName];
      // If category is unchecked and we are checking a child sub, we should check the category
      if (!this.state.categories[catName].checked) {
        clickedCategory.checked = true;
      }
      // If all child subs are unchecked, parent category should also get unchecked
      let allSubsUnchecked = true;
      Object.keys(clickedCategory.subs).forEach(sub => {
        if (clickedCategory.subs[sub]) {
          allSubsUnchecked = false;
        }
      });
        if (allSubsUnchecked) {
          clickedCategory.checked = false;
        }
      return newState;
    }, this.showTopPosts);
  }

  toggleAll() {
    const categories = JSON.parse(JSON.stringify(this.state.categories));
    for (let cat in categories) {
      categories[cat].checked = this.state.checkAll;
      for (let sub in categories[cat].subs) {
        categories[cat].subs[sub] = this.state.checkAll;
      }
    }
    this.setState({ categories, checkAll: !this.state.checkAll }, this.showTopPosts)
  }

  handleSubscribe(email) {
    let customCategories = [];
    for (let cat in this.state.categories) {
      if (this.state.categories[cat].checked) {
        let subCollection = [];
        for (let sub in this.state.categories[cat].subs) {
          if (this.state.categories[cat].subs[sub]) {
            subCollection.push(sub);
          }
        }
        customCategories.push({ name: cat, subCollection: subCollection.join(' ') });
      }
    }
    customCategories = customCategories.sort((catA, catB) => {
      return this.state.categories[catA.name].order - this.state.categories[catB.name].order;
    });
    axios.post(`${this.apiUrl}/users`, { email, customCategories })
      .then(() => this.setState({ subscribed: true }))
  }

  handleReorder(category, direction) {
    const categories = JSON.parse(JSON.stringify(this.state.categories));
    const currentOrder = categories[category].order;
    const categoriesCount = Object.keys(categories).length;
    if (currentOrder == 1 && direction === 'up' || currentOrder == categoriesCount && direction === 'down') {
      return;
    } else {
      for (let key in categories) {
        if (direction === 'up') {
          if (categories[key].order === currentOrder - 1) {
            categories[key].order += 1;
            categories[category].order -= 1;
          }
        } else {
          if (categories[key].order === currentOrder + 1) {
            categories[key].order -= 1;
            categories[category].order += 1;
          }
        }
      }
    };
    this.setState({ categories }, this.showTopPosts);
  }

  render () {
    const {classes} = this.props;
    const categoriesAvailable = Object.entries(this.state.categories).sort((catA, catB) => catA[1].order - catB[1].order);
    const categoriesSelected = Object.entries(this.state.display).sort((catA, catB) => {
      return this.state.categories[catA[0]].order - this.state.categories[catB[0]].order
    });
    let emailPreview = '';
    if (Object.keys(this.state.display).length) {
      emailPreview = <Email categoriesSelected={categoriesSelected} />
    }
    const drawerContents = categoriesAvailable.map(category => 
      <ListCategory 
        key = {'opt_' + category[0]} 
        params = {category[1]}
        handleCategoryClick = {this.handleCategoryClick}
        handleSubClick = {this.handleSubClick}
        handleReorder = {this.handleReorder}
      />)
    return (
      <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Typography variant="h1">Reddit By Email</Typography>
        <Typography variant="h6" className={classes.subheader}>
        Get inspired & intrigued with top posts from Reddit, delivered daily (free!)
        </Typography>
        <Typography variant="h6"> 
          Preview below, then <Button variant="contained" className={classes.heroButton} onClick={this.openMobileDrawer}>customize</Button> or <Button variant="contained" color="secondary" className={classes.heroButton} onClick={this.openSubscribeModal}>subscribe</Button>
        </Typography>
        <Subscribe subscribeModalOpen={this.state.subscribeModalOpen} closeSubscribeModal={this.closeSubscribeModal} handleSubscribe={this.handleSubscribe} subscribed={this.state.subscribed}/>
        {emailPreview}
        <Button variant="outlined"><Link className={classes.footerText} href={"https://surveys.hotjar.com/s?siteId=1215551&surveyId=129017"} target="_blank">Leave Feedback</Link></Button>
      </main>
      <Hidden mdDown implementation='css'>
        <Drawer variant ='permanent' anchor='right' open={true}>
          <List>
            <ListItem className={classes.checkAll} onClick={this.toggleAll}>
            <Typography className={classes.checkAllText}>Check / Uncheck All</Typography>
            </ListItem>
          </List>
          {drawerContents}
        </Drawer>
      </Hidden>
      <Hidden lgUp implementation='css'>
        <Drawer variant ='temporary' anchor='right' open={this.state.mobileDrawerOpen} onClose={this.closeMobileDrawer}>
          <List>
            <ListItem className={classes.checkAll} onClick={this.toggleAll}>
            <Typography className={classes.checkAllText}>Check / Uncheck All</Typography>
            </ListItem>
          </List>
          {drawerContents}
        </Drawer>
      </Hidden>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

module.exports = withStyles(styles)(App);
