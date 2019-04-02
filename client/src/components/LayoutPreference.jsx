import React from 'react';
import Option from './Option.jsx'

const LayoutPreference = (props) => {
  return (
    <div>
      What do you want to read first?
      <div>
        <Option option='Business & Technology'/>
        <Option option='General Science'/>
        <Option option='Psychology'/>
        <Option option='Space'/>
        <Option option='JavaScript'/>
        <Option option='Gadgets'/>
        <Option option='Fun & Facinating'/>
        <Option option='Short Stories'/>
      </div>
    </div>
  )
};

export default LayoutPreference;
