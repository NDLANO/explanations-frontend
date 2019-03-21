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

import NotAuthorizedPage from '../ErrorPage/NotAuthorized'
import SearchPage from '../SearchPage/SearchPageContainer';
import {
    searchRoute,
    catchAllRoute,
    logoutRoute,
    notAuthorizedRoute,
    notFoundRoute,
    loginRoute,
    embeddedRoute,
    conceptRoute
} from '../../utilities/routeHelper';
import LogoutPage from '../LogoutPage';
import NotFoundPage from "../ErrorPage/NotFoundPage";
import Login from "../Login";
import EmbeddedPage from "../EmbeddedPage";


import ConceptPage from '../Concept/';
import {matchShape} from "../../utilities/commonShapes";


class Test extends React.Component {

    componentDidMount() {
        window.addEventListener("message", this.receiveMessage, false);

    }
    receiveMessage(event)
    {
        console.log(event)
    }
    componentWillUnmount() {
        window.removeEventListener("message", this.receiveMessage, false);

    }

    render() {
        return (
            <iframe src="http://localhost:3000/concept/742/edit" width="1000px" height="1000px">

            </iframe>
        )
    }
}

const RoutesContainer = ({match: {url}}) => (
    <Switch>
        <Route path={`${url}${conceptRoute()}`} component={ConceptPage}/>
        <Route path={`${url}${loginRoute()}`} component={Login}/>
        <Route path={`${url}${logoutRoute()}`} component={LogoutPage}/>
        <Route path={`${url}${notAuthorizedRoute()}`} component={NotAuthorizedPage}/>
        <Route path={`${url}${notFoundRoute()}`} component={NotFoundPage}/>
        <Route path={`${url}${searchRoute()}`} exact component={SearchPage}/>
        <Route path={`${url}/test`} exact component={Test}/>
        <Route path={`${url}${catchAllRoute()}`} component={NotFoundPage}/>
    </Switch>
);

RoutesContainer.propTypes = {
    match: PropTypes.shape(matchShape)
};

export default withRouter(RoutesContainer);
