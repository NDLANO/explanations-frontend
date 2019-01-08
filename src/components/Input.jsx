/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from 'prop-types';

import FormElement from "./FormElement";


const Input = props =>
    <FormElement {...props}>
        <input placeholder={props.t(props.placeholder)} readOnly={props.readOnly}
                {...props.input}/>
    </FormElement>;


Input.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired,

    readOnly: PropTypes.bool
};

Input.defaultProps = {
    readOnly: false
};

export default Input;