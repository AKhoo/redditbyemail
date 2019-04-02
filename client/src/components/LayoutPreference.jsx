import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Option from './Option.jsx'

const styles = {
  options: {
    'margin-bottom': 30,
  }
}

const LayoutPreference = (props) => {
  const {classes, handleLayoutClick} = props;
  return (
    <div className={classes.options}>
      <Typography variant="h6">
        What do you want to read first?
      </Typography>
      <div>
        <Option option='Business & Technology' icon='icon_biz.png' link='/businessandtech' handleLayoutClick={handleLayoutClick}/>
        <Option option='General Science' icon='icon_science.png' link='/science' handleLayoutClick={handleLayoutClick} />
        <Option option='Psychology' icon='icon_psychology.png' link='/psychology' handleLayoutClick={handleLayoutClick} />
        <Option option='Space' icon='icon_space.png' link='/space' handleLayoutClick={handleLayoutClick} />
        <Option option='JavaScript' icon='icon_js.png' link='/javascript' handleLayoutClick={handleLayoutClick} />
        <Option option='Gadgets' icon='icon_gadgets.png' link='/gadgets' handleLayoutClick={handleLayoutClick} />
        <Option option='Fascinating' icon='icon_fascinating.png' link='/fascinating' handleLayoutClick={handleLayoutClick} />
        <Option option='Short Stories' icon='icon_stories.png' link='/shortstories' handleLayoutClick={handleLayoutClick} />
      </div>
    </div>
  )
};

export default withStyles(styles)(LayoutPreference);
