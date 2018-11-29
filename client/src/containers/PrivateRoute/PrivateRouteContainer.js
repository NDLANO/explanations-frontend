/**
 * Copyright (C) 2018 -present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import {loginRoute, forbiddenRoute, routeIsAllowed} from "../../utilities/routeHelper";


class PrivateRouteContainer extends React.Component {
    constructor(props){
        super(props);
        this.renderComponent = this.renderComponent.bind(this);
    }

    renderComponent() {
        const {isAuthenticated, allowedScopesForUser, requiredScopes, location, component: Component} = this.props;

        if (routeIsAllowed(requiredScopes, allowedScopesForUser, isAuthenticated))
            return <Component {...this.props} />;

        const route = isAuthenticated ? forbiddenRoute() : loginRoute();
        return <Redirect to={{
                pathname: route,
                state: { from: location },
            }}
        />
    }

    render() {
        const {component, ...rest} = this.props;
        return <Route {...rest} render={this.renderComponent}/>
    }
}

PrivateRouteContainer.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({}),
    requiredScopes: PropTypes.arrayOf(PropTypes.string).isRequired,
    allowedScopesForUser: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.credentials.isAuthenticated,
    allowedScopesForUser: state.credentials.scopes,
});

export default connect(mapStateToProps)(PrivateRouteContainer);