/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from 'prop-types';

import FormElement from "./FormElement";
import {fieldInputShape} from "../utilities/commonShapes";


const Input = props =>
    <FormElement {...props}>
        <input placeholder={props.t(props.placeholder)} readOnly={props.readOnly} type={props.type} {...props.input}/>
    </FormElement>;


Input.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    input: fieldInputShape.isRequired,
    placeholder: PropTypes.string.isRequired,

    // Optional
    type: PropTypes.string,
    readOnly: PropTypes.bool
};

Input.defaultProps = {
    readOnly: false,
    type: "text"
};

export default Input;