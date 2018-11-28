/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import {compose} from "redux";
import {injectT} from "ndla-i18n";


import Loading from '../../Loading';
import Concept from "../components/Concept";
import WithEither from "../../../components/HOC/WithEither";
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE} from "../UpdateConceptPage/updateConceptActions";
import {submitErrorHandler, submitSuccessHandler} from "../conceptCommon";
import FlashMessage, {clearFlashMessage, updateFlashMessage} from "../../../components/FlashMessage";

import {UPDATE_FLASH_MESSAGE_CONCEPT_CLONE, updateInitialFormValues} from "./cloneConceptActions";
import {mapStateToProps} from './cloneConceptMapStateToProps';




class CloneConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.loadConcept();
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CLONE);
    }

    submit(concept) {
        const {clearFlashMessage, updateFlashMessage, t, history} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CLONE);

        const create = this.props.apiClient.createConcept(concept);
        const errorHandler = {
            titleMessage: t(`cloneConcept.submitMessage.error.title`),
            actionType: UPDATE_FLASH_MESSAGE_CONCEPT_CLONE,
        };

        create
            .then(data => submitSuccessHandler(data, {
                actionType: UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE,
                titleMessage: t(`cloneConcept.submitMessage.success.title`),
                history,
                id: data.data.data.id,
            }, updateFlashMessage))
            .catch(err => submitErrorHandler(err, errorHandler, updateFlashMessage));
        return create;
    }

    loadConcept() {
        const {id} = this.props.match.params;
        this.props.apiClient.getConceptById(id).then(concept => {

            delete concept.created;
            delete concept.id;
            delete concept.updated;

            const meta = {};

            concept.meta.forEach(x => {
                meta[`meta_${x.category.name.toLowerCase()}`] = {value: x.id, label: x.name};
            });
            this.props.updateInitialFormValues({
                ...concept,
                statusId: {value: concept.status.id, label: concept.status.name},
                ...meta,
            });
        })
    }

    renderContent() {
        if (this.props.initialFormValues) {
            return <Concept Concept status={this.props.status}
                            initialValues={this.props.initialFormValues}
                            t={this.props.t}
                            metas={this.props.meta}
                            title={this.props.t("createConcept.title")}
                            submitConcept={this.submit} />;
        } else {
            return <Loading message="loadingMessage.initializingForm"/>
        }
    }

    render() {
        return (
            <React.Fragment>
                <FlashMessage {...this.props.flashMessage}/>
                {this.renderContent()}
            </React.Fragment>

        );
    }
}


const metaExists = ({meta}) =>  meta.length > 0;
const statusExists = ({status}) => status.length > 0;

export default compose(
    withRouter,
    connect(mapStateToProps, {updateFlashMessage, updateInitialFormValues, clearFlashMessage}),
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
)(CloneConceptPageContainer);
