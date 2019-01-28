import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  category: {
    marginTop: 40,
  },
  post: {
    marginTop: 10,
  },
  divider: {
    marginTop: 10
  },
  cat: {
    color: 'rgba(255,0,0,0.87)',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: 0,
    margin: 0
  },
  postTitle: {
    color: 'black',
    lineHeight: 1.35
  },
  desc: {
    color: 'grey'
  },
  icon: {
    marginLeft: 6,
    verticalAlign: 'text-top',
    display: 'inline-block',
  }
});

function Category(props) {
  const { classes } = props;
  return (
    <div key = {'div_cat_' + props.category} className = {classes.category}>
      <Typography className={classes.cat} variant="h5">{props.category}</Typography>
      <Divider />
      {props.data.map(post => {
        return (
          <div key = {'div_post_' + post._id} className = {classes.post}>
            <Link variant="subtitle1" className={classes.postTitle} href={post.url} target="_blank">{post.title}</Link>
            <Link href={`https://www.reddit.com${post.permalink}`} target="_blank">
              <img src='https://s3-us-west-1.amazonaws.com/redditbyemail/forumicon.png' className={classes.icon}/>
            </Link>
            <Divider className={classes.divider} light={true}/>
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
