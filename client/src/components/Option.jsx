import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: 177,
    height: 80,
    margin: 5,
    'padding-top': 2,
    border: '1px solid #e6e6e6',
    display: 'inline-block',
    '&:hover': {
      border: '1px solid grey',
      cursor: 'pointer',
    }
  },
  content: {
    'line-height': 'normal',
  },
  optionText: {
    'line-height': 'normal',
  },
  icon: {
    'border-radius': 0,
  }
};

const Option = (props) => {
  const { classes } = props;
  return (
    <Card className={classes.card} elevation={0}>
      <CardHeader 
        disableTypography={true}
        title={
          <Typography variant="subtitle1" className={classes.optionText}>
            {props.option}
          </Typography>
        }
        avatar={
          <Avatar 
            src={props.icon}
            className={classes.icon}
          />
        }
      />
    </Card>
  )
};

export default withStyles(styles)(Option);
