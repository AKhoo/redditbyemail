import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import ListCategory from './components/ListCategory.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      categories: {
        'General Knowledge': {
          name: 'General Knowledge',
          order: 1,
          subs: {
            'TodayILearned': true,
            'ExplainLikeImFive': true
          }
        }
      }
    }
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSubClick = this.handleSubClick.bind(this);
  }

  componentDidMount() {
  }

  handleCategoryClick() {

  }

  handleSubClick(e) {
    const sub = e.currentTarget.childNodes[1].textContent;
    const cat = e.currentTarget.parentNode.childNodes[0].childNodes[1].textContent;
    this.setState((state) => {
      const newState = JSON.parse(JSON.stringify(state));
      newState.categories[cat].subs[sub] = !newState.categories[cat].subs[sub];
      return newState;
    });
  }

  render () {
    const categories = Object.values(this.state.categories);
    return (
      <React.Fragment>
      <CssBaseline />
      <Typography variant="h1">Reddit Newsletter</Typography>
      <Typography variant="h6">
        The most inspirational and educational posts from Reddit, 
        delivered to you daily. 
      </Typography>
      <Typography variant="h6"> 
        Preview below, then customize or subscribe.
      </Typography>
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

ReactDOM.render(<App />, document.getElementById('app'));
