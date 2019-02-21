import React from 'react';
import Category from './Category.jsx'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    marginBottom: 40,
  },
});

const Email = (props) => {
  const { classes } = props;
  return (
    <div className = { classes.content }>
    {
      props.categoriesSelected.map(category => (
        <Category 
        category = {category[0]}
        data = {category[1]} 
        key = {category[0]}
        />)
      )
    }
    </div>
  );
}

module.exports = withStyles(styles)(Email);
