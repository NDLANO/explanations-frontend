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

import './style.css';
import Concept from "./components/Concept";
import {createConcept} from "../../api";

class CreatePageContainer extends React.Component {
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
        const {t, meta=[], status=[]} = this.props;
        if (meta.length > 0 && status.length > 0)
            return (
                <Concept status={status}
                         t={t}
                         metas={meta}
                         title="createConcept"
                         onConceptDone={this.submit}/>
            );

        return <div>Loading ...</div>
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
    connect(mapStateToProps, null),
    injectT
)(CreatePageContainer);