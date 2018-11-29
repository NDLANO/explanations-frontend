import React from "react";
import FormElement from "./FormElement";


const Input = props =>
    <FormElement {...props}>
        <input  placeholder={props.t(props.placeholder)} readOnly={props.readOnly}
                {...props.input}/>
    </FormElement>;
export default Input;