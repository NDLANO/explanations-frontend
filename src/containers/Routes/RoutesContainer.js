/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, withRouter} from 'react-router';

import SearchPage from '../SearchPage/SearchPageContainer';
import {
    searchRoute,
    conceptRoute,
} from '../../utilities/routeHelper';
import {matchProps} from "../../utilities/commonProps";
import ConceptPage from "../Concept";

const RoutesContainer = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}${conceptRoute()}`} component={ConceptPage} />
        <Route path={`${path}${searchRoute()}`} exact component={SearchPage}/>
    </Switch>
);

RoutesContainer.propTypes = {
    match: PropTypes.shape(matchProps).isRequired,
};

export default withRouter(RoutesContainer);
