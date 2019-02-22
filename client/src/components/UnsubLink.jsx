import React from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  unsubLink: {
    color: rgba(0,0,0,0.54),
  },
});

const UnsubLink = (props) => {
  const { classes, email } = props;
  return (
    <Link variant="caption" href={email} className={classes.unsubLink}> click here.</Link>
  );
}

module.exports = withStyles(styles)(UnsubLink);
