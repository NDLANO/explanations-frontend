/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import {loginRoute, notAuthorizedRoute, routeIsAllowed} from "../../utilities/routeHelper";
import {locationShape} from "../../utilities/commonShapes";


class PrivateRouteContainer extends React.Component {
    constructor(props){
        super(props);
        this.renderComponent = this.renderComponent.bind(this);
    }

    renderComponent() {
        const {isAuthenticated, allowedScopesForUser, requiredScopes, location, component: Component, render} = this.props;

        if (routeIsAllowed(requiredScopes, allowedScopesForUser, isAuthenticated)){
            if (render)
                return render();
            else
                return <Component {...this.props} />;
        }

        const route = isAuthenticated ? notAuthorizedRoute() : loginRoute();
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
    // Required
    location: PropTypes.shape(locationShape).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    requiredScopes: PropTypes.arrayOf(PropTypes.string).isRequired,
    allowedScopesForUser: PropTypes.arrayOf(PropTypes.string).isRequired,


    // Optional
    render: PropTypes.func,
    component: PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated: state.credentials.isAuthenticated,
    allowedScopesForUser: state.credentials.scopes,
});

export default connect(mapStateToProps)(PrivateRouteContainer);