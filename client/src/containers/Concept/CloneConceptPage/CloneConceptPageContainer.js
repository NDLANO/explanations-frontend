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
import {getConceptById, updateConcept} from "../../../api";
import {compose} from "redux";
import {injectT} from "ndla-i18n";

import Loading from '../../Loading';
import Concept from "../components/Concept";
import WithEither from "../../../components/HOC/WithEither";
import FlashMessage, {clearFlashMessage, updateFlashMessage} from "../../../components/FlashMessage";
import {SEVERITY} from "../../../components/FlashMessage";
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE} from "../UpdateConceptPage/updateConceptActions";

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
        this.props.updateFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CLONE);
        this.props.updateInitialFormValues(null);
    }

    submit(concept) {
        const {t, updateFlashMessage, clearFlashMessage, initialFormValues, history} = this.props;
        clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CLONE);
        const message = {};
        const update = updateConcept(concept);

        update
            .then(x => {
                message['severity'] = SEVERITY.success;
                message['title'] = t('cloneConcept.submitMessage.success.title');
                updateFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE, message);

                history.push(`/update/${initialFormValues.id}`);
                return x;
            })
            .catch(err => {
                const {errors} = err.response.data;

                message['severity'] = SEVERITY.error;
                message['title'] = t('cloneConcept.submitMessage.error.title');
                if (errors)
                    message['message'] = errors['errorMessage'];
                updateFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CLONE, message);

                return err;
            });
        return update;
    }

    loadConcept() {
        const {id} = this.props.match.params;
        getConceptById(id)
            .then(data => {
                if (data.data) {
                    const {data: concept} = data.data;

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
                }
            })
    }

    render() {
        if (!this.props.initialFormValues)
            return <Loading message="loadingMessage.initializingForm"/>;

        return (
            <React.Fragment>
                <FlashMessage {...this.props.flashMessage}/>
                <Concept Concept status={this.props.status}
                    initialValues={this.props.initialFormValues}
                    t={this.props.t}
                    metas={this.props.meta}
                    title={this.props.t("createConcept.title")}
                    submitConcept={this.submit} />
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
