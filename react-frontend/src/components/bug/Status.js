import React from "react";

function Status({value, onChangeHandler}) {
 return (
    <select className="bug-info-input" 
    onChange={onChangeHandler}  
    name="status"
    id="status"
    value={value}
  >
    <option value="---">---</option>
    <option value="Open">Open</option>
    <option value="In Progress">In Progress</option>
    <option value="Fixed">Fixed</option>
    <option value="Closed">Closed</option>
  </select>
 )
}

export default Status;