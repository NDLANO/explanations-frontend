/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import {Route, Switch} from "react-router";
import {historyShape, matchShape} from "../../utilities/commonShapes";
import {UPDATE_FLASH_MESSAGE_CONCEPT} from "./conceptActions";
import {loadConcept, submitErrorHandler} from "./conceptCommon";
import ApiService from "../../services/apiService";
import NotFoundPage from "../ErrorPage/NotFoundPage";
import {catchAllRoute} from "../../utilities/routeHelper";
import PrivateRoute from '../PrivateRoute';

class ConceptRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.renderNotFoundPage = this.renderNotFoundPage.bind(this);
    }

    componentDidMount() {
        const {updateFlashMessage, history, t, updateInitialFormValues} = this.props;
        const errorHandler = {
            titleMessage: 'conceptPage.loadDataMessage.error',
            actionType: UPDATE_FLASH_MESSAGE_CONCEPT,
            history
        };

        loadConcept(this.props.apiService, this.props.match.params.id, t)
            .then(concept => updateInitialFormValues({...concept, statusId: concept.status.languageVariation}))
            .catch( err => submitErrorHandler(err, errorHandler, updateFlashMessage));
    }

    renderNotFoundPage() {
        return <NotFoundPage t={this.props.t} />
    }

    render() {
        const {
            match,
            renderCopyPage,
            renderEditPage,
            renderCreateLanguageVariationPage,
            createConceptRequiredScope
        } = this.props;
        return (
            <Switch>
                <Route path={`${match.url}/edit`}
                       render={renderEditPage.bind(null, 1)}
                       id={match.params.id}/>
                <PrivateRoute path={`${match.url}/copy`}
                              render={renderCopyPage}
                              requiredScopes={createConceptRequiredScope}
                              id={match.params.id} />
                <PrivateRoute path={`${match.url}/newLanguageVariation`}
                              render={renderCreateLanguageVariationPage}
                              requiredScopes={createConceptRequiredScope}
                              id={match.params.id} />
                <Route path={catchAllRoute()} render={this.renderNotFoundPage} />
            </Switch>
        )
    }
}

ConceptRoutes.propTypes = {
    // Required
    match: matchShape.isRequired,
    history: historyShape.isRequired,
    renderCopyPage: PropTypes.func.isRequired,
    renderEditPage: PropTypes.func.isRequired,
    clearFlashMessage: PropTypes.func.isRequired,
    updateFlashMessage: PropTypes.func.isRequired,
    updateInitialFormValues: PropTypes.func.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    renderCreateLanguageVariationPage: PropTypes.func.isRequired,
    createConceptRequiredScope: PropTypes.arrayOf(PropTypes.string),
    updateConceptRequiredScope: PropTypes.arrayOf(PropTypes.string),
};

export default withRouter(ConceptRoutes);

