import React from "react";


const Input = ({className, t, input, label, meta, placeholder}) => (
    <div  className={className}>
        <label htmlFor={input.id}>{t(label)}</label>
        <div>
            <input {...input}  placeholder={t(placeholder)}/>
            {meta.touched && meta.error
                ? <span className="field-validation-error" {...input}>{t(meta.error)}</span>
                : null}
        </div>
    </div>
);
export default Input;