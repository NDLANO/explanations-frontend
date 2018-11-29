/**
 * Copyright (C) 2018 -present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const StatusComponent = ({ code, children }) => (
    <Route
        render={({ staticContext }) => {
            if (staticContext) {
                staticContext.context.status = code;
            }
            return children;
        }}
    />
);

StatusComponent.propTypes = {
    code: PropTypes.number.isRequired,
};

export default StatusComponent;