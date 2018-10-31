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
import {getConceptById, updateConcept, archiveConcept} from "../../../api";
import {compose} from "redux";
import {injectT} from "ndla-i18n";

import '../style.css';
import Concept from "../components/Concept";
import {OneColumn} from "ndla-ui";
import ConfirmModal from "../components/ConfirmModal";



class UpdateConceptPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {concept: null, errorMessage: ""};
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


    submit() {
        updateConcept(this.state.concept)
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err.response.data));
    }

    renderCloneButton() {
        return <button className="c-button" type="submit" onClick={this.onCloneClicked}>{this.props.t("cloneConcept")}</button>
    }

    renderDeleteButton() {
        return <button className="c-button" type="submit" >{this.props.t("deleteConcept")}</button>
    }

    render() {
        const {t, meta=[], status=[]} = this.props;
        if (this.state.concept && meta.length > 0 && status.length > 0)
            return (
                <div>

                    <Concept status={status}
                             t={t}
                             concept={this.state.concept}
                             metas={meta}
                             title={t("updateConcept")}
                             onConceptDone={this.submit}/>

                    <OneColumn>
                        <ConfirmModal triggerButton={this.renderDeleteButton} onConfirm={this.onDeleteClicked} />
                        <ConfirmModal triggerButton={this.renderCloneButton} onConfirm={this.onCloneClicked} />

                    </OneColumn>

                    <OneColumn>

                    </OneColumn>
                </div>
            );

        return (
            <OneColumn>
                <div>Loading ...</div>
            </OneColumn>
        )

    }
}

const mapStateToProps = ({meta, status}) => {
    return {
        meta,
        status: status.all
    }
};



export default compose(
    withRouter,
    connect(mapStateToProps, {archiveConcept}),
    injectT
)(UpdateConceptPage);