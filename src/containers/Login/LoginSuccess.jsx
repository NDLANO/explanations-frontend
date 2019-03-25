/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from "redux";

import AuthenticationService from '../../services/authenticationService';
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import {indexRoute} from "../../utilities/routeHelper";
import {loginSuccess, updateNext} from './loginActions';
import {historyProps, locationShape} from "../../utilities/commonProps";

class LoginSuccessContainer extends React.Component {
    componentDidMount() {
        const {history, loginSuccess, location: {hash}, authenticationService, next, updateNext} = this.props;
        authenticationService.getCredentials(hash).then(credentials => {
            if (!credentials)
                return;
            loginSuccess(credentials);
            history.replace(next ? next : indexRoute());
            updateNext();
        });
    }

    render() {
        return <div/>;
    }
}

LoginSuccessContainer.propTypes = {
    history: PropTypes.shape(historyProps).isRequired,
    location: PropTypes.shape(locationShape).isRequired,
    updateNext: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    authenticationService: PropTypes.instanceOf(AuthenticationService).isRequired,

    // Optional
    next: PropTypes.string,
};

const mapStateToProps = ({credentials: {next}}) => ({next});

export default compose(
    connect(mapStateToProps,{loginSuccess, updateNext}),
    withAuthenticationService,
)(LoginSuccessContainer);
