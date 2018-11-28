/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import {compose} from "redux";
import {connect} from "react-redux";
import {injectT} from "ndla-i18n";

import Loading from "../../../components/Loading/index";
import Concept from "../components/Concept";
import WithEither from "../../../components/HOC/WithEither";
import {updateRoute} from "../../../utilities/routeHelper";
import {mapStateToProps} from '../mapStateToProps';


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
        return this.props.apiClient
            .createConcept(concept)
            .then(data => this.props.history.push(updateRoute(data.data.data.id)));
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

            this.setState({
                initialValues: {
                    ...concept,
                    statusId: {value: concept.status.id, label: concept.status.name},
                    ...meta,
                    },
            });
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


const requiredPropsIsNotYetPresent = () => <Loading/>;
const metaExists = ({meta}) =>  meta.length > 0;
const statusExists = ({status}) => status.length > 0;

export default compose(
    withRouter,
    connect(mapStateToProps),
    injectT,
    WithEither(metaExists, requiredPropsIsNotYetPresent),
    WithEither(statusExists, requiredPropsIsNotYetPresent)
)(CloneConceptPageContainer);
