/**
 * Copyright (C) 2018 -present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {compose} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {logoutSuccess} from "./logoutActions";
import AuthenticationService from "../../services/authenticationService";

class LogoutContainer extends React.PureComponent {
    componentDidMount() {
        this.props.logoutSuccess();
        this.props.authService.logoutUser();
    }

    render() {
        return (<div/>)
    }
}

LogoutContainer.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    logoutSuccess: PropTypes.func.isRequired,
    authService: PropTypes.instanceOf(AuthenticationService).isRequired
};

const mapStateToProps = state => ({authService: new AuthenticationService({})});

export default compose(
    withRouter,
    connect(mapStateToProps, {logoutSuccess})
)(LogoutContainer);
