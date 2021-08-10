import React from "react";
import { DateTimePicker } from "@material-ui/pickers";

function Deadline({value, onChangeHandler, defaultToNow}) {
 const defaultValue = defaultToNow ? new Date() : null;
 return (
  <div className="bug-info-input">
    <DateTimePicker
      onChange={onChangeHandler}  
      name="deadline"
      id="deadline"
      value={value ? value : defaultValue}
    />
  </div>
 )
}

export default Deadline;