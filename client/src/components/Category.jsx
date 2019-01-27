import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  image: {
    float: 'right',
    height: 80,
    width: 80,
    marginLeft: 20
  },
  category: {
    marginTop: 50,
  },
  post: {
    marginTop: 30,
  }
});

function Category(props) {
  const { classes } = props;
  console.log(props);
  return (
    <div key = {'div_cat_' + props.category} className = {classes.category}>
      <Typography variant="h5">{props.category}</Typography>
      <Divider />
      {props.data.map(post => (
        <div key = {'div_post_' + post.data.id} className = {classes.post}>
          <Typography variant="subtitle1">{post.data.title}</Typography>
          <Typography variant="body1">{post.data.selftext} [read more]</Typography>
          <Divider light={true}/>
        </div>
      ))}
    </div>
  )
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);
