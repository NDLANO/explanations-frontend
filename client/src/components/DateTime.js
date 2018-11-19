import React from "react"

const DateTime = ({label, t, input, className}) => (
    <div  className={className}>
        <label htmlFor={input.id}>{t(label)}</label>
        <time {...input}>{input.value}</time>
    </div>
);
export default DateTime;