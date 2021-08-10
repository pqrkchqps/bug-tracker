import React from "react";

function AssignedTo({value, onChangeHandler, projectUserNames}) {
 return (
  <select className="bug-info-input" 
    onChange={onChangeHandler}  
    name="assigned_to"
    id="assigned_to"
    value={value}
  >
    <option key={-99} value="---">---</option>
    <option key={-1} value="None">None</option>
    {projectUserNames.map((name, index) => <option key={index} value={name}>{name}</option>)}
  </select>
 )
}

export default AssignedTo;