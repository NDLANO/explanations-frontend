import React from "react";

const TextArea = ({className, t, input, placeholder, label, meta, rows=5, columns=50}) => (
    <div  className={className}>
        <label htmlFor={input.id}>{t(label)}</label>
        <div className="input-group">
            <textarea {...input} rows={rows} cols={columns} placeholder={t(placeholder)} />
            {meta.touched && meta.error
                ? <span className="field-validation-error" {...input}>{t(meta.error)}</span>
                : null}
        </div>

    </div>
);
export default TextArea;