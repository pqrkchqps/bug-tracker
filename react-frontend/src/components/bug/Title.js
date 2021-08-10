import React from "react";

function Title({value, onChangeHandler}) {
 return (
  <textarea 
    onChange={onChangeHandler} 
    type="text" 
    name="bug_name"
    id="bug_name"
    value={value}
  />
 )
}

export default Title;