import React from "react";
import {Form, Button} from 'reactstrap'
import {brightWhite} from '../../styles/colors.scss';

function VersionIn({value, onChangeHandler, onSubmit}) {
    if (onSubmit){
        return (
            <Form onSubmit={onSubmit} >
                <input className="bug-info-input" style={{backgroundColor: brightWhite}}
                    type="text" 
                    name="version"
                    id="version"
                />
            <Button type="submit">Submit</Button>
            </Form>
        )
    }
    return (
        <input className="bug-info-input" 
            onChange={onChangeHandler} 
            type="text" 
            name="version"
            id="version"
            value={value}
        />
    )
}

export default VersionIn;