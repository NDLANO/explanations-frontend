/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import FormElement from "./FormElement";


const Input = props =>
    <FormElement {...props}>
        <input  placeholder={props.t(props.placeholder)} readOnly={props.readOnly}
                {...props.input}/>
    </FormElement>;
export default Input;