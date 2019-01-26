import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

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
    <ListItem className={classes.sub}>
      <Checkbox/>
      <ListItemText primary={props.text}></ListItemText>
    </ListItem>
  );
}

ListCategory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListCategory);
