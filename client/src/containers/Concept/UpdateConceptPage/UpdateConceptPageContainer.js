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
import Loading from "../../../components/Loading/index";
import {getConceptById, updateConcept, archiveConcept} from "../../../api";

class UpdateConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.onCloneClicked = this.onCloneClicked.bind(this);
        this.renderDeleteButton  = this.renderDeleteButton.bind(this);
        this.renderCloneButton = this.renderCloneButton.bind(this);
    }

    componentDidMount() {
        this.loadConcept();
    }

    loadConcept() {
        const {id} = this.props.match.params;
        getConceptById(id)
            .then(data => {
                if (data.data) {
                    this.setState({concept: data.data.data});
                }
            })
    }


    onCloneClicked() {
        this.props.history.push(`/clone/${this.state.concept.id}`);
    }

    onDeleteClicked() {
        archiveConcept(this.state.concept.id);
    }


    submit(concept) {
        updateConcept(concept)
            .then(data => console.log(data))
            .catch(err => console.log(err.response.data));
    }

    renderCloneButton() {
        return <button className="c-button c-button--outline" type="button" onClick={this.onCloneClicked}>{this.props.t("updateConcept.button.clone")}</button>
    }

    renderDeleteButton() {
        return <button className="c-button c-button--outline" type="button" >{this.props.t("updateConcept.button.delete")}</button>
    }

    render() {
        const {t, meta, status} = this.props;

        if (this.state.concept && meta.length > 0 && status.length > 0)
            return (
                <Concept status={status}
                         t={t}
                         initialValues={{...this.state.concept}}
                         selectedStatus={this.state.concept.status}
                         metas={meta}
                         title={t("updateConcept.title")}
                         submit={this.submit}
                        showTimestamps={true}>
                    <ConfirmModal t={t} triggerButton={this.renderDeleteButton} onConfirm={this.onDeleteClicked} title="updateConcept.confirmModal.delete.title"  content="updateConcept.confirmModal.delete.action" />
                    <ConfirmModal t={t} triggerButton={this.renderCloneButton} onConfirm={this.onCloneClicked} title="updateConcept.confirmModal.clone.title"  content="updateConcept.confirmModal.clone.action" />
                </Concept>
            );

        return <Loading/>

    }
}
const mapStateToProps = ({cacheFromServer, locale}) => {
    return {
        meta: cacheFromServer.meta,
        status: cacheFromServer.status.all.map(x => ({value: x.id, label: x.name})),
        locale
    }
};



export default compose(
    withRouter,
    connect(mapStateToProps, {archiveConcept}),
    injectT
)(UpdateConceptPageContainer);