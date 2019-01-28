import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ForumIcon from '@material-ui/icons/ForumOutlined';


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
    marginTop: 2,
    verticalAlign: 'text-top',
    color: 'lightgrey',
    display: 'inline-block',
    fontSize: 14
  }
});

function Category(props) {
  const { classes } = props;
  return (
    <div key = {'div_cat_' + props.category} className = {classes.category}>
      <Typography className={classes.cat} variant="h5">{props.category}</Typography>
      <Divider />
      {props.data.map(post => {
        let description = '';
        if (post.selftext.length <= 172) {
          description = post.selftext;
        } else {
          description = post.selftext.slice(0, 170) + '... Read More >>'
        }
        return (
          <div key = {'div_post_' + post._id} className = {classes.post}>
            <Link variant="subtitle1" className={classes.postTitle} href={post.url} target="_blank">{post.title}</Link>
            <Link href={`https://www.reddit.com${post.permalink}`} target="_blank"><ForumIcon className={classes.icon}/></Link>
            <Typography variant="body1" className={classes.desc}>{description}</Typography>
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
