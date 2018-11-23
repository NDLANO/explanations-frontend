import React from "react";

import FormElement from "./FormElement";


const TextArea = props =>
    <FormElement {...props}>
        <textarea  placeholder={props.t(props.placeholder)}
                   rows={props.rows}
                   cols={props.cols}
                   {...props.input}/>
    </FormElement>;


TextArea.defaultProps = {
    rows: 5,
    cols: 50
};

export default TextArea;