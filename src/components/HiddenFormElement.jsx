/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from 'prop-types';
import {fieldInputShape} from "../utilities/commonShapes";

const HiddenFormElement = ({className, input, meta, children}) => (
    <div className={className}>
        <div className={`${className}--input-group`}>
            {children}
        </div>
    </div>
);

HiddenFormElement.propTypes = {
    // Required
    input: fieldInputShape.isRequired,
    className: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
};



export default HiddenFormElement;