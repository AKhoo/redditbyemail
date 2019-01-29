import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  sub: {
    color: 'white',
    height: 48,
    paddingLeft: '30px',
  },
};

function ListSub(props) {
  const { classes } = props;
  return (
    <ListItem className={classes.sub} onClick={props.handleSubClick}>
      <Checkbox checked={props.checked} disableRipple/>
      <ListItemText primary={props.text}></ListItemText>
    </ListItem>
  );
}

ListSub.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListSub);
