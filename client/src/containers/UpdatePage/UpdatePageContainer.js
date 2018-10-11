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
import {getConceptById, updateConcept} from "../../api";
import {OneColumn} from "ndla-ui";
import {compose} from "redux";
import {injectT} from "ndla-i18n";
import Input from "./components/Input";
import BEMHelper from "react-bem-helper";

import './style.css';
import Meta from "./components/Meta";



const classes = new BEMHelper({
    name: 'update-form',
    prefix: 'c-',
});

class UpdatePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {concept: null, errorMessage: ""};
        this.authorChange = this.onChangeConcept.bind(this, "author");
        this.titleChange = this.onChangeConcept.bind(this, "title");
        this.contentChange = this.onChangeConcept.bind(this, "content");
        this.submit = this.submit.bind(this);
        this.onChangeMeta = this.onChangeMeta.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        getConceptById(id)
            .then(data => {
                if (data.data) {
                    this.setState({concept: data.data});
                }
            })
    }

    onChangeConcept(key, {target: {value}}) {
        const {concept} = this.state;
        this.setState({concept: {...concept, [key]: value}})
    }

    onChangeMeta(key, meta) {
        if (!this.state.concept.metadata) {
            this.setState((state) => {
                const metadata = {
                    isActive: true,
                    data: {
                        languages: [],
                        subjects: []
                    }
                };
                metadata.data = {...metadata.data, [key]: [meta]};
                return {concept: {...state.concept, metadata}};
            });
        }

        this.setState((state) => {

            const {metadata} = state.concept;

            metadata.data = {...metadata.data, [key]: [meta]};
            return ({concept: {...state.concept, metadata}})
        });
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
        const {concept} = this.state;
        const {languages, subjects, t} = this.props;

        if (!concept)
            return <div>Loading...</div>;

        let currentLang = "";
        if (concept.metadata)
            currentLang = concept.metadata.data.languages[0];

        let currentSubject = "";
        if (concept.metadata)
            currentSubject = concept.metadata.data.subjects[0];

        return (
            <OneColumn>
                <form onSubmit={this.submit} {...classes()}>
                    <Input id="author" value={this.state.concept.author} label={t("author")} onChange={this.authorChange} {...classes('form-field')} />
                    <Input id="title" value={this.state.concept.title} label={t("title")} onChange={this.titleChange} {...classes('form-field')} />
                    <Input id="content" value={this.state.concept.content} label={t("content")} onChange={this.contentChange} {...classes('form-field')} />
                    <Meta onChange={this.onChangeMeta} t={t} choices={languages} id="languages" buttonText={t("addLanguage")} labelText={t("labelLanguages")} classes={classes('form-field')}  current={currentLang} />
                    <Meta onChange={this.onChangeMeta} t={t} choices={subjects} id="subjects" buttonText={t("addSubject")} labelText={t("labelSubjects")} classes={classes('form-field')}  current={currentSubject}/>
                    <button className="c-button" type="submit">{t("updateConcept")}</button>
                </form>
            </OneColumn>
        )
    }
}

const mapStateToProps = ({meta: {subjects, languages}}) => ({
    languages,
    subjects
});



export default compose(
    withRouter,
    connect(mapStateToProps, null),
    injectT
)(UpdatePageContainer);