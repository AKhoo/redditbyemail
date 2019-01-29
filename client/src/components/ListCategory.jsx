import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListSub from './ListSub.jsx'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const styles = {
  sub: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 42,
  },
};

function ListCategory(props) {
  const { classes } = props;
  return (
    <List>
      <ListItem className={classes.sub} onClick={props.handleCategoryClick}>
        <Checkbox checked={props.params.checked} disableRipple/>
        <ListItemText primary={props.params.name}></ListItemText>
        <div> 
          <ExpandLess onClick={() => {props.handleReorder(props.params.name, 'up')}}/>
          <ExpandMore onClick={() => {props.handleReorder(props.params.name, 'down')}}/>
        </div>

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
