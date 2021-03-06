/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { OneColumn } from '@ndla/ui';

import LoginFailure from './LoginFailure';
import LoginSuccess from './LoginSuccess';
import LoginProviders from './LoginProvidersContainer';

import {matchProps} from "../../utilities/commonProps";

export const LoginComponent = ({ match: {url} }) => (
  <OneColumn>
      <Switch>
        <Route path={`${url}/success`} component={LoginSuccess} />
        <Route path={`${url}/failure`} component={LoginFailure} />
        <Route component={LoginProviders} />
      </Switch>
  </OneColumn>
);

LoginComponent.propTypes = {
  match: PropTypes.shape(matchProps).isRequired,
};

export default LoginComponent;
