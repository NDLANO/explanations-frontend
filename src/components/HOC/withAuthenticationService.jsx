/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";

import AuthenticationService from "../../services/authenticationService";
import {config} from '../../config';

const withAuthenticationService = WrappedComponent  =>{
    class HOC extends React.Component {
        render () {
            const {accessToken} = this.props;
            const authenticationService = new AuthenticationService({accessToken, authProviderConfig: config.AUTH0});

            return (
                <WrappedComponent
                    {...this.props}
                    authenticationService={authenticationService}
                />
            );
        }
    }


    HOC.propTypes = {
        accessToken: PropTypes.string,
    };

    HOC.defaultProps = {
        accessToken: ''
    };

    return HOC;
};

export default withAuthenticationService;