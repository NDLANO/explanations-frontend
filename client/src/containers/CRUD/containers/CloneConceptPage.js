/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import {getConceptById} from "../../../api";
import {compose} from "redux";
import {injectT} from "ndla-i18n";

import '../style.css';
import CreateConceptPage from "./CreateConceptPage";
import {OneColumn} from "ndla-ui";


class CloneConceptPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {concept: null};
    }

    componentDidMount() {
        this.loadConcept();
    }

    loadConcept() {
        const {id} = this.props.match.params;
        getConceptById(id)
            .then(data => {
                if (data.data) {
                    const {data: concept} = data.data;
                    concept.id = -1;
                    this.setState({concept});
                }
            })
    }

    render() {
        if (this.state.concept)
            return <CreateConceptPage concept={this.state.concept} />


        return (
            <OneColumn>
                <div>Loading ...</div>
            </OneColumn>
        )
    }
}


export default compose(
    withRouter,
    injectT
)(CloneConceptPage);