import React from 'react';
import Category from './Category.jsx'

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
