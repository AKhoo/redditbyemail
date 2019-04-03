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
  activeCard: {
    border: '1px solid rgba(255,0,0,0.87)',
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
  const { classes, handleLayoutClick, openMobileDrawer, customize } = props;
  if (customize) {
    return (
      <Card className={`${classes.card} ${window.location.pathname === props.link ? classes.activeCard : ''}`} elevation={0} onClick={openMobileDrawer}>
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
  } else {
    return (
      <Card className={`${classes.card} ${window.location.pathname === props.link ? classes.activeCard : ''}`} elevation={0} onClick={handleLayoutClick}>
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
  }
};

export default withStyles(styles)(Option);
