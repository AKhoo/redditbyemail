import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListSub from './ListSub.jsx'


const styles = {
  sub: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
  },
};

function ListCategory(props) {
  const { classes } = props;
  return (
    <List>
      <ListItem className={classes.sub}>
        <Checkbox onClick={props.handleCategoryClick}/>
        <ListItemText primary={props.params.name}></ListItemText>
      </ListItem>
      {Object.keys(props.params.subs).map(sub => 
        <ListSub 
          key={sub} 
          text={sub} 
          checked={props.params.subs[sub]}
          handleSubClick={props.handleSubClick}
        />)}
    </List>
  );
}

ListCategory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListCategory);
