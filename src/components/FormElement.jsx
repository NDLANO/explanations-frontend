/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from 'prop-types';
import {fieldInputShape} from "../utilities/commonShapes";

const FormElement = ({className, input, label, required, meta, children, t, messagePrefix}) => (
    <div className={className}>
        <label htmlFor={input.id}>{t(label)} {required ? '*' : ''}</label>
        <div className={`${className}--input-group`}>
            {children}
            {meta.touched && meta.error
                ? <span className="validation-error" {...input}>
                    {meta.error.includes(messagePrefix) ? t(meta.error) : meta.error}
                    </span>
                : null}
        </div>
    </div>
);

FormElement.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    meta: PropTypes.object.isRequired,
    input: fieldInputShape.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,

    // Optional
    required: PropTypes.bool,
    messagePrefix: PropTypes.string,
};


FormElement.defaultProps = {
    messagePrefix: '',
    required: false
};

export default FormElement;