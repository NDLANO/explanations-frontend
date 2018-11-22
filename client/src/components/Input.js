import React from "react";
import FormElement from "./FormElement";


const Input = props =>
    <FormElement {...props}>
        <input  placeholder={props.t(props.placeholder)}
                {...props.input}/>
    </FormElement>;
export default Input;