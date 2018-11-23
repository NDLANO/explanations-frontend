/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import {createConcept, getConceptById} from "../../../api";
import {compose} from "redux";
import {injectT} from "ndla-i18n";

import {mapStateToProps} from '../mapStateToProps';
import Loading from '../../Loading';
import Concept from "../components/Concept";
import {connect} from "react-redux";
import WithEither from "../../../components/HOC/WithEither";
import {updateFlashMessage, clearFlashMessage } from "../../FlashMessage/flashMessageActions";
import {SEVERITY} from "../../FlashMessage";


class CloneConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {initialValues: null};
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.loadConcept();
    }

    submit(concept) {
        this.props.clearFlashMessage();
        return createConcept(concept)
            .then(data => {
                this.props.updateFlashMessage(SEVERITY.success, this.props.t('cloneConcept.cloneMessage.success.title'));
                return this.props.history.push(`/update/${data.data.data.id}`);
            })
            .catch(x => this.props.updateFlashMessage(SEVERITY.error, this.props.t('cloneConcept.cloneMessage.error.title', 'cloneConcept.cloneMessage.error.message')));
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

                    this.setState({
                        initialValues: {
                            ...concept,
                            statusId: {value: concept.status.id, label: concept.status.name},
                            ...meta,
                            },
                    });
                }
            })
    }

    render() {
        if (this.state.initialValues)
            return <Concept status={this.props.status}
                            initialValues={this.state.initialValues}
                            t={this.props.t}
                            metas={this.props.meta}
                            title={this.props.t("createConcept.title")}
                            submitConcept={this.submit} />;

        return <Loading/>
    }
}

const metaExists = ({meta}) =>  meta.length > 0;
const statusExists = ({status}) => status.length > 0;

export default compose(
    withRouter,
    connect(mapStateToProps, {updateFlashMessage,clearFlashMessage }),
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
)(CloneConceptPageContainer);
