import React from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  title: {
    'font-weight': 500,
    marginBottom: 10,
  },
  subheader: {
    marginBottom: 40,
  },
};

const HeroDefault = (props) => {
  const { classes } = props;
  return (
  <div>
    <Typography variant="h3" className={classes.title}>Stay sharp.</Typography>
    <Typography variant="h4" className={classes.subheader}>
    Get the internet's most recommended articles for the topics you care about, daily by email.
    </Typography>
  </div>
  )
};

const HeroFascinating = (props) => {
  const { classes } = props;
  return (
  <div>
    <Typography variant="h3" className={classes.title}>Your most fascinating email.</Typography>
    <Typography variant="h4" className={classes.subheader}>
    Skip the noise. Get interesting, highly-upvoted Reddit discussions delivered daily by email.
    </Typography>
  </div>
  )
};

const HeroShortStories = (props) => {
  const { classes } = props;
  return (
  <div>
    <Typography variant="h3" className={classes.title}>Enjoy amazingly creative stories.</Typography>
    <Typography variant="h4" className={classes.subheader}>
    Read the internet’s favourite writing prompts and responses, delivered daily by email.
    </Typography>
  </div>
  )
};

const HeroDefaultWithStyles = withStyles(styles)(HeroDefault);
const HeroFascinatingWithStyles = withStyles(styles)(HeroFascinating);
const HeroShortStoriesWithStyles = withStyles(styles)(HeroShortStories);

export { HeroDefaultWithStyles, HeroFascinatingWithStyles, HeroShortStoriesWithStyles };
