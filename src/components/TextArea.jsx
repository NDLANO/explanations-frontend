/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";

import FormElement from "./FormElement";


const TextArea = props =>
    <FormElement {...props}>
        <textarea  placeholder={props.t(props.placeholder)}
                   rows={props.rows}
                   cols={props.cols}
                   readOnly={props.readOnly}
                   {...props.input}/>
    </FormElement>;


TextArea.defaultProps = {
    rows: 5,
    cols: 50
};

export default TextArea;