import React from "react";
import Moment from 'react-moment';

const DateTime = ({value, id, label, className, locale}) => (
    <div  className={className}>
        <label htmlFor={id}>{label}</label>
        <Moment id={id} locale={locale}>{value}</Moment>
    </div>
);
export default DateTime;