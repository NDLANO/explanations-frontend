/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import BEMHelper from "react-bem-helper";
import PropTypes from "prop-types";
import Button from "ndla-button";
import {injectT} from 'ndla-i18n';
import {compose} from "redux";
import {Helmet} from "react-helmet";
import {withLastLocation} from "react-router-last-location";
import {connect} from "react-redux";

import AuthenticationService from '../../services/authenticationService';
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import {updateNext} from "./loginActions";


const classes = new BEMHelper({
    name: 'login-providers',
    prefix: 'c-',
});

export const LoginProviderContainer = ({t, authenticationService, consentUrl, updateNext, lastLocation  }) => {
    const {pathname=''} = lastLocation;
    updateNext(pathname);
    const loginClicked = () => {
        authenticationService.loginUser('google-oauth2');
    };

    return (
        <div {...classes()}>
            <Helmet title={t('pageTitles.login')} />
            <div {...classes("content")}>
                <h3>{t('loginProviders.description')}</h3>
                <ul>
                    <li>
                        <Button onClick={loginClicked}
                                {...classes("content", "button", "btn-google")}>
                            Google
                        </Button>
                    </li>
                </ul>
            </div>
            <div {...classes('privacy-consent')}>
                <p>{t('loginProviders.consent_before_link')} <a href={consentUrl}>{t('loginProviders.consent_link')}</a>{t('loginProviders.consent_after_link')}</p>
            </div>
        </div>
    );
};

LoginProviderContainer.propTypes = {
    t: PropTypes.func.isRequired,
    consentUrl: PropTypes.string.isRequired,
    updateNext: PropTypes.func.isRequired,
    authenticationService: PropTypes.instanceOf(AuthenticationService).isRequired,
    lastLocation: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

LoginProviderContainer.defaultProps = {
    consentUrl: 'https://om.ndla.no/samtykke/',
    lastLocation: {pathname: ''}
};

export default compose(
    injectT,
    withLastLocation,
    connect(null, {updateNext}),
    withAuthenticationService,
)(LoginProviderContainer);
