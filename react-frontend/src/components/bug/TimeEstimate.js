import React from "react";
import {Form, Button} from 'reactstrap'
import {brightWhite} from '../../styles/colors.scss';

function TimeEstimate({value, onChangeHandler, onSubmit}) {
    if (onSubmit){
        return (
            <Form onSubmit={onSubmit} >
                <input className="bug-info-input"  style={{backgroundColor: brightWhite}}
                    type="number"
                    min="0"
                    step="any"
                    name="time_estimate"
                    id="time_estimate"
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
            name="time_estimate"
            id="time_estimate"
            value={value}
        />
    )
}

export default TimeEstimate;