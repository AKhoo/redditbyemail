import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link as RouterLink } from "react-router-dom";

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
    'text-decoration': 'none',
  },
  icon: {
    'border-radius': 0,
  }
};

const Option = (props) => {
  const { classes } = props;
  return (
    <Card className={classes.card} elevation={0}>
      <RouterLink to={props.link}>
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
      </RouterLink>
    </Card>
  )
};

export default withStyles(styles)(Option);
