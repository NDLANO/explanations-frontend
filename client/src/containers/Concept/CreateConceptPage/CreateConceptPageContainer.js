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
import Loading from '../../Loading';
import WithEither from "../../../components/HOC/WithEither";

import {mapStateToProps} from "./CreateConceptMapStateToProps";
import {updateFlashMessage } from "../../../components/FlashMessage";
import {SEVERITY} from "../../../components/FlashMessage";

class CreateConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(concept) {
        this.props.updateFlashMessage();
        return createConcept(concept)
            .then(data =>  {
                this.props.updateFlashMessage(SEVERITY.success, this.props.t('createConcept.createMessage.success.title'));
                return this.props.history.push(`/update/${data.data.data.id}`)
            })
            .catch(x => this.props.updateFlashMessage(SEVERITY.error, this.props.t('createConcept.createMessage.error.title'), this.props.t('createConcept.createMessage.error.message')));
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

const metaExists = ({meta}) =>  meta.length > 0;
const statusExists = ({status}) => status.length > 0;
const formHasInitialValues = ({initialValues}) => {
    return Object.values(initialValues).indexOf(null) === -1 &&
        typeof initialValues['statusId'] !== "undefined" &&
        typeof initialValues['meta_language'] !== "undefined";
};

export default compose(
    withRouter,
    connect(mapStateToProps, {updateFlashMessage }),
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
    WithEither(formHasInitialValues, () => <Loading message="loadingMessage.initializingForm"/>),
)(CreateConceptPageContainer);