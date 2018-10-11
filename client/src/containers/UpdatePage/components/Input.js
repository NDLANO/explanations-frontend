import React from "react";

const Input = ({value, type="text", id, label, onChange,className}) => (
    <div  className={className}>
        <label htmlFor={id}>{label}</label>
        <input type={type} value={value} id={id} onChange={onChange} placeholder={id} />
    </div>
);
export default Input;