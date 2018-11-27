/*
 * Part of NDLA editorial-frontend.
 * Copyright (C) 2018 -present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { toLogin } from '../../util/routeHelpers';

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: toLogin(),
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({}),
};

const mapStateToProps = state => ({
    authenticated: state.session.authenticated,
});

export default connect(mapStateToProps)(PrivateRoute);