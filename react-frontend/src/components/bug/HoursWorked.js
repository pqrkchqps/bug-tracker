import React from "react";
import {Form, Button} from 'reactstrap'
import {brightWhite} from '../../styles/colors.scss';

function HoursWorked({value, onChangeHandler, onSubmit}) {
    if (onSubmit){
        return (
            <Form onSubmit={onSubmit} >
                <input className="bug-info-input" style={{backgroundColor: brightWhite}}
                    type="number"
                    min="0"
                    step="any" 
                    name="hours_worked"
                    id="hours_worked"
                />
                <Button type="submit">Submit</Button>
            </Form>
        )
    }
    return (
        <input className="bug-info-input" 
            onChange={onChangeHandler} 
            type="number"
            min="0"
            step="any" 
            name="hours_worked"
            id="hours_worked"
            value={value}
        />
    )
}

export default HoursWorked;