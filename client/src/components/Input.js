import React from "react";


const Input = ({className, input, label, meta, placeholder}) => (
    <div  className={className}>
        <label htmlFor={input.id}>{label}</label>
        <div className="input-group">
            <input {...input}  placeholder={placeholder}/>
            {meta.touched && meta.error
                ? <span className="field-validation-error" {...input}>{meta.error}</span>
                : null}
        </div>
    </div>
);
export default Input;