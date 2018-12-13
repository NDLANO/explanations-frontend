/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {injectT} from 'ndla-i18n';

import {loginRoute} from "../../utilities/routeHelper";

export const LoginFailure = ({t}) => (
    <div>
        <h2>{t('loginFailure.errorMessage')}</h2>
        <p>
            <Link to={loginRoute()}>{t('loginFailure.loginLink')}</Link>
        </p>
    </div>
);

LoginFailure.propTypes = {
    t: PropTypes.func.isRequired
};

export default injectT(LoginFailure);
