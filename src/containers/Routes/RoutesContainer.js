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
    catchAllRoute,
    conceptRoute,
} from '../../utilities/routeHelper';
import NotFoundPage from "../ErrorPage/NotFoundPage";
import {matchShape} from "../../utilities/commonShapes";
import ConceptPage from "../Concept";


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
            <iframe src="http://localhost:3000/embedded/concept/742/edit" width="1000px" height="1000px">

            </iframe>
        )
    }
}

const RoutesContainer = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}${conceptRoute()}`} component={ConceptPage} />
        <Route path={`${path}${searchRoute()}`} exact component={SearchPage}/>
        <Route path={`${path}/test`} exact component={Test}/>
        <Route path={`${path}${catchAllRoute()}`} component={NotFoundPage}/>
    </Switch>
);

RoutesContainer.propTypes = {
    match: PropTypes.shape(matchShape)
};

export default withRouter(RoutesContainer);
