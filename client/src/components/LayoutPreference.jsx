import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Option from './Option.jsx'

const styles = {
  options: {
    'margin-bottom': 20,
  }
}

const LayoutPreference = (props) => {
  const {classes} = props;
  return (
    <div className={classes.options}>
      <Typography variant="h6">
        What do you want to read first?
      </Typography>
      <div>
        <Option option='Business & Technology' icon='icon_biz.png' link='/businessandtech'/>
        <Option option='General Science' icon='icon_science.png' link='/science' />
        <Option option='Psychology' icon='icon_psychology.png' link='/psychology' />
        <Option option='Space' icon='icon_space.png' link='/space' />
        <Option option='JavaScript' icon='icon_js.png' link='/javascript' />
        <Option option='Gadgets' icon='icon_gadgets.png' link='/gadgets' />
        <Option option='Fascinating' icon='icon_fascinating.png' link='/fascinating' />
        <Option option='Short Stories' icon='icon_stories.png' link='/shortstories' />
      </div>
    </div>
  )
};

export default withStyles(styles)(LayoutPreference);
