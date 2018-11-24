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
import Loading from '../../Loading';
import WithEither from "../../../components/HOC/WithEither";
import {createConcept} from "../../../api";
import {updateFlashMessage, clearFlashMessage } from "../../../components/FlashMessage";
import {SEVERITY} from "../../../components/FlashMessage";


import FlashMessageComponent from "../../../components/FlashMessage/FlashMessageComponent";
import {mapStateToProps} from "./createConceptMapStateToProps";
import {UPDATE_FLASH_MESSAGE_CONCEPT_CREATE} from "./createConceptActions";
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE} from "../UpdateConceptPage/updateConceptActions";

class CreateConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(concept) {
        const {clearFlashMessage, updateFlashMessage, t, history} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CREATE);

        const message = {};
        const callback = createConcept(concept);
        callback
            .then(data =>  {
                message['severity'] = SEVERITY.success;
                message['title'] = t('createConcept.createMessage.success.title');
                updateFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE, message);

                history.push(`/update/${data.data.data.id}`)
            })
            .catch(x => {
                const {errors} = x.response.data;
                message['severity'] = SEVERITY.error;
                message['title'] =  t('createConcept.createMessage.error.title');
                message['message'] = Object.values(errors).join(" ");
                updateFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CREATE, message);
            });
        return callback;
    }

    render() {
        return (
            <React.Fragment>
                <FlashMessageComponent {...this.props.flashMessage}/>
                <Concept status={this.props.status}
                         initialValues={this.props.initialValues}
                         t={this.props.t}
                         metas={this.props.meta}
                         title={this.props.t("createConcept.title")}
                         submitConcept={this.submit}
                />
            </React.Fragment>
        );
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
    connect(mapStateToProps, {updateFlashMessage, clearFlashMessage }),
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
    WithEither(formHasInitialValues, () => <Loading message="loadingMessage.initializingForm"/>),
)(CreateConceptPageContainer);