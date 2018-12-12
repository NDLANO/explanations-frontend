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

import AuthenticationService from '../../services/authenticationService';
import {indexRoute} from "../../utilities/routeHelper";

import {loginSuccess} from './loginActions';

class LoginSuccessContainer extends React.Component {
    componentDidMount() {
        const {history, loginSuccess, location: {hash}, authenticationService} = this.props;
        authenticationService.getCredentials(hash).then(credentials => {
            if (!credentials)
                return;
            loginSuccess(credentials);
            history.replace(indexRoute())
        });
    }

    render() {
        return <div/>;
    }
}

LoginSuccessContainer.propTypes = {
    history: PropTypes.shape({
        replace: PropTypes.func.isRequired
    }).isRequired,
    loginSuccess: PropTypes.func.isRequired,
    location: PropTypes.shape({hash: PropTypes.string}).isRequired,
    authenticationService: PropTypes.instanceOf(AuthenticationService).isRequired
};

const mapStateToProps = state => ({authenticationService: new AuthenticationService({})});

export default connect(mapStateToProps,{loginSuccess})(LoginSuccessContainer);
