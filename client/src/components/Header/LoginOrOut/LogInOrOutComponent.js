/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import {loginRoute, logoutRoute} from "../../../utilities/routeHelper";

const Login = ({t}) =>              <Link to={loginRoute()}>{t('header.login')}</Link>;
const Logout = ({t, username}) =>   <Link to={logoutRoute()}>{t('header.logout')} {username}</Link>;

const  LogInOrOutComponent = ({isLoggedIn, ...rest}) => isLoggedIn ? <Logout {...rest} /> : <Login {...rest} />;

LogInOrOutComponent.propTypes = {
    // Required
    t: PropTypes.func.isRequired,

    // Optional
    isLoggedIn: PropTypes.bool,
    username: PropTypes.string
};

LogInOrOutComponent.defaultProps = {
    isLoggedIn: false,
    username: ''
};

export default LogInOrOutComponent