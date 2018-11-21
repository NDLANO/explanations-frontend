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

import Concept from "../components/Concept/index";
import {createConcept} from "../api";
import Loading from "../components/Loading/index";
import WithEither from "../components/HOC/WithEither";

class CreateConceptPage extends React.Component {
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
                        t={this.props.t}
                        metas={this.props.meta}
                        title={this.props.t("createConcept.title")}
                        submit={this.submit}
                        concept={this.props.concept}
        />
    }
}

const mapStateToProps = ({cacheFromServer}) => {
    return {
        meta: cacheFromServer.meta,
        status: cacheFromServer.status.all,
    }
};

CreateConceptPage.defaultProps = {
    meta: [],
    status: []
};

const requiredPropsIsNotYetPresent = () => <Loading/>;
const metaExists = ({meta}) =>  meta.length > 0;
const statusExists = ({status}) => status.length > 0;
const metaAndStatusShouldBePresent = compose(
    WithEither(metaExists, requiredPropsIsNotYetPresent),
    WithEither(statusExists, requiredPropsIsNotYetPresent)
)(CreateConceptPage);

export default compose(
    withRouter,
    connect(mapStateToProps, null),
    injectT
)(metaAndStatusShouldBePresent);