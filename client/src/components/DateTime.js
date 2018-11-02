import React from "react"

const DateTime = ({value, id, label, className, locale}) => (
    <div  className={className}>
        <label htmlFor={id}>{label}</label>
        <time id={id} locale={locale}>{value}</time>
    </div>
);
export default DateTime;