import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListCategory from './components/ListCategory.jsx'
import ListSub from './components/ListSub.jsx'




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
  }

  render () {
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
        <List>
          <ListCategory text='General Knowledge'/>
          <ListSub text='TodayILearned'/>
          <ListSub text='ExplainLikeImFive'/>
          <ListSub text='EducationalGIFs'/>
        </List>
      </Drawer>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
