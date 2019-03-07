/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from 'prop-types';
import {fieldInputShape} from "../utilities/commonShapes";

const FormElement = ({className, input, label, meta, children, t, messagePrefix}) => (
    <div className={className}>
        <label htmlFor={input.id}>{t(label)}</label>
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
    input: fieldInputShape.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,

    // Optional
    messagePrefix: PropTypes.string,
};


FormElement.defaultProps = {
    messagePrefix: '',
};

export default FormElement;