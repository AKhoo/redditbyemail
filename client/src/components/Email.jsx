import React from 'react';
import Category from './Category.jsx'
import Button from '@material-ui/core/Button';

const Email = (props) => {
  return (
    props.categoriesSelected.map(category => (
      <Category 
      category = {category[0]}
      data = {category[1]} 
      key = {category[0]}
      />)
    )
  );
}

module.exports = Email;
