import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  card: {
    width: 177,
    height: 70,
    display: 'inline-block',
    margin: 5,
    'line-height': '70px',
  },
  content: {
    'line-height': 'normal',
    'vertical-align': 'middle',
    display: 'inline-block',
  }
};

const Option = (props) => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        {props.option}
      </CardContent>
    </Card>
  )
};

export default withStyles(styles)(Option);
