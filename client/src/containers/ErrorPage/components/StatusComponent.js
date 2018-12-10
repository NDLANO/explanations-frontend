/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Route} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const Status = ({ code, children }) => (
    <Route
        render={({ staticContext }) => {
            const context = staticContext;
            if (staticContext) {
                context.status = code;
            }
            return children;
        }}
    />
);

Status.propTypes = {
    code: PropTypes.number.isRequired,
};

export default Status;