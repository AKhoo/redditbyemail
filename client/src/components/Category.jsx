import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
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
      {props.data.map(post => {
        let description = '';
        if (post.data.selftext.length <= 172) {
          description = post.data.selftext;
        } else {
          description = post.data.selftext.slice(0, 170) + '... Read More >>'
        }
        return (
          <div key = {'div_post_' + post.data.id} className = {classes.post}>
            <Link variant="subtitle1" href={post.data.url}>{post.data.title}</Link>
            <Typography variant="body1">{description}</Typography>
            <Divider light={true}/>
          </div>
        )
      })}
    </div>
  )
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);
