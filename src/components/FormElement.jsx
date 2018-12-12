import React from "react";


const FormElement = ({className, input, label, meta, children, t, messagePrefix}) => (
    <div  className={className}>
        <label htmlFor={input.id}>{t(label)}</label>
        <div className={`${className}--input-group`}>
            {children}
            {meta.touched && meta.error
                ? <span className={`${className}--validation-error`} {...input}>
                    {meta.error.includes(messagePrefix) ? t(meta.error) : meta.error}
                    </span>
                : null}
        </div>
    </div>
);
export default FormElement;