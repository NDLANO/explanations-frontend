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
import {getConceptById, updateConcept, archiveConcept} from "../../api";
import {compose} from "redux";
import {injectT} from "ndla-i18n";

import './style.css';
import Concept from "./components/Concept";
import {OneColumn} from "ndla-ui";



class UpdatePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {concept: null, errorMessage: ""};
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.loadConcept();
    }

    loadConcept() {
        const {id} = this.props.match.params;
        getConceptById(id)
            .then(data => {
                console.log(data.data.data)
                if (data.data) {
                    this.setState({concept: data.data.data});
                }
            })
    }

    submit(e) {
        e.preventDefault();
        updateConcept(this.state.concept)
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err.response.data));
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
                             title="createConcept"
                             onConceptDone={this.submit}/>
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
)(UpdatePageContainer);