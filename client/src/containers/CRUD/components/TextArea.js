import React from "react";

const TextArea = ({value, type="text", id, label, onChange,className, isReadOnly=false, rows=5, columns=50}) => (
    <div  className={className}>
        <label htmlFor={id}>{label}</label>
        <textarea rows={rows} cols={columns} value={value} id={id} onChange={onChange} placeholder={label} readOnly={isReadOnly} />
    </div>
);
export default TextArea;