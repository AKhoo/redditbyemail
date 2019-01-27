import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import ListCategory from './components/ListCategory.jsx'
import Category from './components/Category.jsx'
import Subscribe from './components/Subscribe.jsx'
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  layout: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 6,
    [theme.breakpoints.up('md')]: {
      width: 750,
    }
  },
  subheader: {
    marginBottom: 30
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      categories: {
        'General Knowledge': {
          name: 'General Knowledge',
          checked: true,
          order: 1,
          subs: {
            'TodayILearned': true,
            'ExplainLikeImFive': false
          },
        },
        'JavaScript': {
          name: 'JavaScript',
          checked: true,
          order: 1,
          subs: {
            'JavaScript': true,
            'node': true,
            'ReactJS': true,
          }
        }
      },
      posts: {},
      display: {},
      mobileDrawerOpen: false,
      subscribeModalOpen: false
    }
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSubClick = this.handleSubClick.bind(this);
    this.showTopPosts = this.showTopPosts.bind(this);
    this.openMobileDrawer = this.openMobileDrawer.bind(this);
    this.closeMobileDrawer = this.closeMobileDrawer.bind(this);
    this.openSubscribeModal = this.openSubscribeModal.bind(this);
    this.closeSubscribeModal = this.closeSubscribeModal.bind(this);
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
    const promises = [];
    const categoriesAvailable = this.state.categories;
    // For each category
    Object.keys(categoriesAvailable).forEach(category => {
      Object.keys(categoriesAvailable[category].subs).forEach(sub => {
        const subChecked = categoriesAvailable[category].subs[sub]
        // If sub doesn't yet exist in posts (ie. never fetched), get from Reddit
        if (!this.state.posts[sub] && subChecked) {
          promises.push(
            axios.get(`https://www.reddit.com/r/${sub}/top.json?limit=5`)
              .then(({data}) => {
                const posts = JSON.parse(JSON.stringify(this.state.posts));
                posts[sub] = data.data.children;
                this.setState({posts});
              })
          );
        }
      });
    });
    Promise.all(promises).then(this.showTopPosts);
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
        return postB.data.ups - postA.data.ups;
      });
      if (allPosts.length) {
        display[category] = allPosts;
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
    const cat = e.currentTarget.childNodes[1].textContent;
    const categories = JSON.parse(JSON.stringify(this.state.categories));
    // Toggle checked value
    categories[cat].checked = !categories[cat].checked;
    // Set child subs' checked values to same
    Object.keys(categories[cat].subs).forEach(sub => {
      categories[cat].subs[sub] = categories[cat].checked;
    });
    this.setState({categories}, this.getPosts);
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
    }, this.getPosts);
  }

  render () {
    const {classes} = this.props;
    const categoriesAvailable = Object.entries(this.state.categories);
    const categoriesSelected = Object.entries(this.state.display);
    let emailPreview = '';
    if (Object.keys(this.state.display).length) {
      emailPreview = categoriesSelected.map(category => (
        <Category 
        category = {category[0]}
        data = {category[1]} 
        key = {category[0]}
        />)
      );
    }
    const drawerContents = categoriesAvailable.map(category => 
      <ListCategory 
        key = {'opt_' + category[0]} 
        params = {category[1]}
        handleCategoryClick = {this.handleCategoryClick}
        handleSubClick = {this.handleSubClick}
      />)
    return (
      <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Typography variant="h1">Reddit By Email</Typography>
        <Typography variant="h6" className={classes.subheader}>
          Get the most interesting posts from Reddit, delivered to your inbox daily 
        </Typography>
        <Typography variant="h6"> 
          Preview below, then <Button variant="outlined" onClick={this.openMobileDrawer}>customize</Button> or <Button variant="contained" color="secondary" onClick={this.openSubscribeModal}>subscribe</Button>
        </Typography>
        <Subscribe subscribeModalOpen={this.state.subscribeModalOpen} closeSubscribeModal={this.closeSubscribeModal}/>
        {emailPreview}
      </main>
      <Hidden smDown implementation='css'>
        <Drawer variant ='permanent' anchor='right' open={true}>
          {drawerContents}
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation='css'>
        <Drawer variant ='temporary' anchor='right' open={this.state.mobileDrawerOpen} onClose={this.closeMobileDrawer}>
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


ReactDOM.render(React.createElement(withStyles(styles)(App)), document.getElementById('app'));
