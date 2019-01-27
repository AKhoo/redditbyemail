import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  image: {
    float: 'right',
    height: 80,
    width: 80,
    marginLeft: 20
  },
});

function Category(props) {
  const { classes } = props;
  return (
    <div>
      <Typography variant="h5">General Knowledge</Typography>
      <Typography variant="h6">ELI5: Government Shut-Down</Typography>
      <Typography variant="body1">As always, we require users to search for past topics before posting their own, so that we can avoid the unnecessary clutter of many people asking the same question.</Typography>
    </div>
  )
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);
