/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from "prop-types";
import {compose} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {injectT} from "@ndla/i18n";

import {logoutSuccess} from "./logoutActions";
import AuthenticationService from "../../services/authenticationService";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import {historyProps} from "../../utilities/commonShapes";

class LogoutContainer extends React.PureComponent {
    componentDidMount() {
        this.props.logoutSuccess();
        this.props.authenticationService.logoutUser();
    }

    render() {
        return (
            <Helmet title={this.props.t('pageTitles.logout')} />)
    }
}

LogoutContainer.propTypes = {
    history: PropTypes.shape(historyProps).isRequired,
    logoutSuccess: PropTypes.func.isRequired,
    authenticationService: PropTypes.instanceOf(AuthenticationService).isRequired
};


export default compose(
    withRouter,
    injectT,
    withAuthenticationService,
    connect(null, {logoutSuccess})
)(LogoutContainer);
