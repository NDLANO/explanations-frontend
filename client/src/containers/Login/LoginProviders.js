/**
 * Copyright (C) 2018 -present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import BEMHelper from "react-bem-helper";
import {injectT} from 'ndla-i18n';
import {compose} from "redux";
import {connect} from "react-redux";

import AuthenticationService from '../../services/authenticationService';
import {config} from '../../config';

import PropTypes from "prop-types";
import Button from "ndla-button";


const classes = new BEMHelper({
    name: 'login-providers',
    prefix: 'c-',
});

export const LoginProviderContainer = ({t, authenticationService, consentUrl}) =>
    <div {...classes()}>
        <div {...classes("content")}>
            <h3>{t('loginProviders.description')}</h3>
            <ul>
                <li>
                    <Button onClick={() => authenticationService.loginUser('google-oauth2')}
                        {...classes("content", "button", "btn-google")}>
                        Google
                    </Button>
                </li>
            </ul>
        </div>
        <div {...classes('privacy-consent')}>
            <p>{t('loginProviders.consent_before_link')} <a href={consentUrl}>{t('loginProviders.consent_link')}</a>{t('loginProviders.consent_after_link')}</p>
        </div>
    </div>;

const mapStateToProps = state => ({authenticationService: new AuthenticationService({}), consentUrl: config.EXTERNAL_URL.consent_NDLA});

LoginProviderContainer.propTypes = {
    t: PropTypes.func.isRequired,
    consentUrl: PropTypes.string.isRequired,
    authenticationService: PropTypes.instanceOf(AuthenticationService).isRequired,
};

export default compose(
    connect(mapStateToProps),
    injectT
)(LoginProviderContainer);
