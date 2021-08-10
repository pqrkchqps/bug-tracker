import React from "react";

function Severity({value, onChangeHandler}) {
 return (
    <select className="bug-info-input"
        onChange={onChangeHandler}  
        name="severity"
        id="severity"
        value={value}
    >
        <option key={-99} value="---">---</option>
        <option value="None">None</option>
        <option value="Minor">Minor</option>
        <option value="Major">Major</option>
        <option value="Critical">Critical</option>
        <option value="Explosive">Explosive</option>
    </select>
 )
}

export default Severity;