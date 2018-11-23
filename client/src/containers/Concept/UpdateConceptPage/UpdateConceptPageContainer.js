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

import Concept from "../components/Concept";
import ConfirmModal from "../../../components/ConfirmModal";
import Loading from '../../Loading';
import {getConceptById, updateConcept, archiveConcept} from "../../../api";
import WithEither from "../../../components/HOC/WithEither";

import {mapStateToProps} from '../mapStateToProps';
import {updateFlashMessage, clearFlashMessage} from "../../FlashMessage/flashMessageActions";
import {SEVERITY} from "../../FlashMessage/FlashMessageContainer";

class UpdateConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {initialValues: null};

        this.submit = this.submit.bind(this);
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.onCloneClicked = this.onCloneClicked.bind(this);
        this.renderDeleteButton  = this.renderDeleteButton.bind(this);
        this.renderCloneButton = this.renderCloneButton.bind(this);
    }

    componentDidMount() {
        this.loadConcept();
    }

    componentWillUnmount() {
        this.props.clearFlashMessage();
    }

    loadConcept() {
        const {id} = this.props.match.params;
        getConceptById(id)
            .then(data => {
                if (data.data) {
                    const {data: concept} = data.data;
                    const meta = {};

                    concept.meta.forEach(x => {
                        meta[`meta_${x.category.name.toLowerCase()}`] = {value: x.id, label: x.name};
                    });
                    const statusId = {value: concept.status.id, label: concept.status.name};

                    this.setState({
                        deleteButtonIsDisabled: statusId.label === "Archived",
                        initialValues: {
                            ...concept,
                            statusId,
                            ...meta,
                        },
                    });
                }
            })
    }


    onCloneClicked() {
        this.props.clearFlashMessage();
        this.props.history.push(`/clone/${this.state.initialValues.id}`);
    }

    onDeleteClicked() {
        this.props.clearFlashMessage();
        archiveConcept(this.state.initialValues.id)
            .then(data =>  {
                this.props.updateFlashMessage(SEVERITY.success, this.props.t('updateConcept.deleteMessage.success.title'));
                this.props.history.push(`/update/${this.state.initialValues.id}`)
            })
            .catch(x => this.props.updateFlashMessage(SEVERITY.error, this.props.t('updateConcept.deleteMessage.error.title'), this.props.t('updateConcept.deleteMessage.error.message')));
    }


    submit(concept) {
        this.props.clearFlashMessage();
        return updateConcept(concept)
            .then(x => {
                this.props.updateFlashMessage(SEVERITY.success, this.props.t('updateConcept.updateMessage.success.title'));
                this.props.history.push(`/update/${this.state.initialValues.id}`);
            })
            .catch(x => this.props.updateFlashMessage(SEVERITY.error, this.props.t('updateConcept.updateMessage.error.title'), this.props.t('updateConcept.updateMessage.error.message')));
    }

    renderCloneButton() {
        return <button className="c-button c-button--outline" type="button" onClick={this.onCloneClicked}>{this.props.t("updateConcept.button.clone")}</button>
    }

    renderDeleteButton() {
        return <button className="c-button c-button--outline" type="button" disabled={this.state.deleteButtonIsDisabled} >{this.props.t("updateConcept.button.delete")}</button>
    }

    render() {
        if (this.state.initialValues)
            return (
                <Concept status={this.props.status}
                         initialValues={this.state.initialValues}
                         t={this.props.t}
                         metas={this.props.meta}
                         title={this.props.t("updateConcept.title")}
                         submitConcept={this.submit}
                         showTimestamps={true}>

                    <ConfirmModal t={this.props.t}
                                  triggerButton={this.renderDeleteButton}
                                  onConfirm={this.onDeleteClicked}
                                  title="updateConcept.confirmModal.delete.title"
                                  content="updateConcept.confirmModal.delete.action"/>
                    <ConfirmModal t={this.props.t} triggerButton={this.renderCloneButton} onConfirm={this.onCloneClicked} title="updateConcept.confirmModal.clone.title"  content="updateConcept.confirmModal.clone.action" />
                </Concept>
            );

        return <Loading/>
    }
}

const metaExists = ({meta}) =>  meta.length > 0;
const statusExists = ({status}) => status.length > 0;

export default compose(
    withRouter,
    connect(mapStateToProps, {archiveConcept, updateFlashMessage, clearFlashMessage}),
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
)(UpdateConceptPageContainer);
