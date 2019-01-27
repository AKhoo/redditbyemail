import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import ListCategory from './components/ListCategory.jsx'
import Category from './components/Category.jsx'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  layout: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 6,
    [theme.breakpoints.up('md')]: {
      width: 1000,
    }
  },
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
          }
        }
      },
      posts: {},
      display: {}
    }
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSubClick = this.handleSubClick.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    // For each category
    Object.keys(this.state.categories).forEach(category => {
      Object.keys(this.state.categories[category].subs).forEach(sub => {
        const subChecked = this.state.categories[category].subs[sub]
        // If sub doesn't yet exist in posts (ie. never fetched), get from Reddit
        if (!this.state.posts[sub] && subChecked) {
          console.log(sub);
          axios.get(`https://www.reddit.com/r/${sub}/top.json?limit=5`)
            .then(({data}) => {
              const posts = JSON.parse(JSON.stringify(this.state.posts));
              posts[sub] = data.data.children;
              this.setState({posts});
              console.log(data.data.children);
            });
        }
      });
    });
  }
  
  showTopPosts() {
    // Combine and select top 10
    // When people select / deselect, only fetch the new categories
  }

  handleCategoryClick(e) {
    const cat = e.currentTarget.childNodes[1].textContent;
    const categories = JSON.parse(JSON.stringify(this.state.categories));
    categories[cat].checked = !categories[cat].checked;
    Object.keys(categories[cat].subs).forEach(sub => {
      categories[cat].subs[sub] = categories[cat].checked;
    });
    this.setState({categories}, this.getPosts);
  }

  handleSubClick(e) {
    const sub = e.currentTarget.childNodes[1].textContent;
    const cat = e.currentTarget.parentNode.childNodes[0].childNodes[1].textContent;
    this.setState((state) => {
      const newState = JSON.parse(JSON.stringify(state));
      newState.categories[cat].subs[sub] = !newState.categories[cat].subs[sub];
      return newState;
    }, this.getPosts);
  }

  render () {
    const {classes} = this.props;
    const categories = Object.values(this.state.categories);
    return (
      <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Typography variant="h1">Reddit Newsletter</Typography>
        <Typography variant="h6">
          The most inspirational and educational posts from Reddit, 
          delivered to you daily. 
        </Typography>
        <Typography variant="h6"> 
          Preview below, then customize or subscribe.
        </Typography>
        <Category/>
      </main>
      <Drawer variant ='persistent' anchor='right' open={true}>
        {categories.map(category => 
          <ListCategory 
            key = {category.name} 
            params = {category}
            handleCategoryClick = {this.handleCategoryClick}
            handleSubClick = {this.handleSubClick}
          />)}
      </Drawer>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


ReactDOM.render(React.createElement(withStyles(styles)(App)), document.getElementById('app'));
