/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from 'prop-types';
import ApiService from "../../services/apiService";
import {config} from '../../config';
import AuthenticationService from "../../services/authenticationService";


const withApiService = WrappedComponent  =>{
    class HOC extends React.Component {
        render () {
            const {accessToken, history, loginSuccess, authenticationService} = this.props;
            const apiService = new ApiService({
                accessToken,
                history,
                setCredentialsInStore: loginSuccess,
                apiUrl: config.EXTERNAL_URL.conceptApi || `${config.EXTERNAL_URL.ndlaApi}/concepts`,
                authenticationService
            });

            return (
                <WrappedComponent
                    {...this.props}
                    apiService={apiService}
                />
            );
        }
    }

    HOC.propTypes = {
        history: PropTypes.object.isRequired,
        loginSuccess: PropTypes.func.isRequired,
        authenticationService: PropTypes.instanceOf(AuthenticationService).isRequired,
        accessToken: PropTypes.string,
    };
    HOC.defaultProps = {
        accessToken: ''
    };

    return HOC;
};

export default withApiService;