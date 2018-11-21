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
import {createConcept} from "../../../api";
import Loading from "../../../components/Loading/index";
import WithEither from "../../../components/HOC/WithEither";

import {mapStateToProps} from "./CreateConceptMapStateToProps";

class CreateConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(concept) {
        console.log("submitting",concept);
        createConcept(concept)
            .then(data => this.props.history.push(`/update/${data.data.data.id}`))
            .catch(data => console.log(data.response.data));
    }

    render() {
        return <Concept status={this.props.status}
                        initialValues={this.props.initialValues}
                        t={this.props.t}
                        metas={this.props.meta}
                        title={this.props.t("createConcept.title")}
                        submitConcept={this.submit}
        />
    }
}

CreateConceptPageContainer.defaultProps = {
    meta: [],
    status: []
};

const requiredPropsIsNotYetPresent = () => <Loading/>;
const metaExists = ({meta}) =>  meta.length > 0;
const statusExists = ({status}) => status.length > 0;
const formHasInitialValues = ({initialValues}) => Object.values(initialValues).indexOf(null) === -1;

export default compose(
    withRouter,
    connect(mapStateToProps, null),
    injectT,
    WithEither(metaExists, requiredPropsIsNotYetPresent),
    WithEither(statusExists, requiredPropsIsNotYetPresent),
    WithEither(formHasInitialValues, requiredPropsIsNotYetPresent)
)(CreateConceptPageContainer);