/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {compose} from "redux";
import {injectT} from "ndla-i18n";

import Concept from "../components/Concept/";
import Loading from '../../Loading';
import WithEither from "../../../components/HOC/WithEither";
import withApiService from "../../../components/HOC/withApiService";
import FlashMessageComponent, {updateFlashMessage, clearFlashMessage } from "../../../components/FlashMessage";
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE} from "../UpdateConceptPage";
import {submitErrorHandler, submitSuccessHandler} from "../conceptCommon";


import {mapStateToProps} from "./createConceptMapStateToProps";
import {UPDATE_FLASH_MESSAGE_CONCEPT_CREATE} from "./createConceptActions";


class CreateConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentWillUnmount() {
        this.props.updateFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CREATE);
    }

    submit(concept) {
        const {clearFlashMessage, updateFlashMessage, t, history} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CREATE);

        const create = this.props.apiService.createConcept(concept);
        const errorHandler = {
            titleMessage: t(`createConcept.submitMessage.error.title`),
            actionType: UPDATE_FLASH_MESSAGE_CONCEPT_CREATE,
            history
        };

        create
            .then(data => submitSuccessHandler(data, {
                actionType: UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE,
                titleMessage: t(`createConcept.submitMessage.success.title`),
                history,
                id: data.data.data.id,
            }, updateFlashMessage))
            .catch(err => submitErrorHandler(err, errorHandler, updateFlashMessage));
        return create;
    }

    render() {
        return (
            <React.Fragment>
                <FlashMessageComponent {...this.props.flashMessage}/>
                <Concept status={this.props.status}
                         initialValues={this.props.initialFormValues}
                         t={this.props.t}
                         metas={this.props.meta}
                         title={this.props.t("createConcept.title")}
                         submitConcept={this.submit}
                />
            </React.Fragment>
        );
    }
}

CreateConceptPageContainer.defaultProps = {
    meta: [],
    status: []
};

const metaExists = ({meta}) =>  meta.length > 0;
const statusExists = ({status}) => status.length > 0;
const formHasInitialValues = ({initialFormValues}) => {
    return Object.values(initialFormValues).indexOf(null) === -1 &&
        initialFormValues['statusId'] &&
        initialFormValues['meta_language'] &&
        initialFormValues['meta_licence'] ;
};

export default compose(
    withRouter,
    connect(mapStateToProps, {updateFlashMessage, clearFlashMessage }),
    withApiService,
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
    WithEither(formHasInitialValues, () => <Loading message="loadingMessage.initializingForm"/>),
)(CreateConceptPageContainer);