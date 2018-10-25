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
import {createConcept} from "../../api";
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

class CreatePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {concept: {
            title: "",
            content: "",
            externalId: -1,
            author: "",
            source: "",
            meta: []
            }, errorMessage: ""};
        this.authorChange = this.onChangeConcept.bind(this, "author");
        this.titleChange = this.onChangeConcept.bind(this, "title");
        this.contentChange = this.onChangeConcept.bind(this, "content");
        this.externalIdChange = this.onChangeConcept.bind(this, "externalId");
        this.sourceChange = this.onChangeConcept.bind(this, "source");
        this.submit = this.submit.bind(this);
        this.onChangeMeta = this.onChangeMeta.bind(this);
    }

    onChangeConcept(key, {target: {value}}) {
        const {concept} = this.state;
        this.setState({concept: {...concept, [key]: value}})
    }

    onChangeMeta(key, meta) {
        if (typeof meta !== "object")
            meta = this.props[key].find(x => x.id+"" === meta)
        if (!this.state.concept.meta) {
            this.setState((state) => ({concept: {...state.concept, meta: [meta]}}));
        } else {
            this.setState((state) => {
                const metaList = state.concept.meta.filter(x => x.category.name !== meta.category.name);
                metaList.push(meta);
                return ({concept: {...state.concept, meta: metaList}})
            });
        }
    }


    submit(e) {
        e.preventDefault();

        this.setState(state =>
                ({concept: {...state.concept, status: this.props.status}}),
            () => createConcept(this.state.concept)
                .then(data => {
                    this.props.history.push(`update/${data.data.data.id}`)
                })
                .catch(err => console.log(err.response.data))
        );
        console.log("submitting",this.state.concept);
    }

    render() {
        
        const {concept} = this.state;
        const {languages, subjects, t, licences} = this.props;


        let currentLang = "";
        let currentSubject = "";
        let currentLicence = "";
        if (concept.meta){
            currentLang = concept.meta.find(m => m.category.name === "Language");
            currentSubject = concept.meta.find(m => m.category.name === "Subject");
            currentLicence = concept.meta.find(m => m.category.name === "Licence");
        }

        return (
            <OneColumn>
                <h1>{t("createConcept")}</h1>
                <form onSubmit={this.submit} {...classes()}>
                    <Input id="author" value={this.state.concept.author} label={t("author")} onChange={this.authorChange} {...classes('form-field')}  />
                    <Input id="title" value={this.state.concept.title} label={t("title")} onChange={this.titleChange} {...classes('form-field')} />
                    <Input id="content" value={this.state.concept.content} label={t("content")} onChange={this.contentChange} {...classes('form-field')} />
                    <Input id="externalId" value={this.state.concept.externalId} label={t("externalId")} onChange={this.externalIdChange} {...classes('form-field')} />
                    <Input id="source" value={this.state.concept.source} label={t("source")} onChange={this.sourceChange} {...classes('form-field')} />
                    <Meta onChange={this.onChangeMeta} t={t} choices={languages} id="languages" buttonText={t("addLanguage")} labelText={t("labelLanguages")} classes={classes('form-field')}  current={currentLang} />
                    <Meta onChange={this.onChangeMeta} t={t} choices={subjects} id="subjects" buttonText={t("addSubject")} labelText={t("labelSubjects")} classes={classes('form-field')}  current={currentSubject}/>
                    <Meta onChange={this.onChangeMeta} t={t} choices={licences} id="licences" buttonText={t("addLicence")} labelText={t("labelLicence")} classes={classes('form-field')}  current={currentLicence}/>
                    <button className="c-button" type="submit">{t("createConcept")}</button>
                </form>
            </OneColumn>
        )
    }
}

const mapStateToProps = ({meta: {subjects, languages, licences}, status}) => {
    return {
        languages,
        subjects,
        licences,
        status: status.current
    }
};



export default compose(
    withRouter,
    connect(mapStateToProps, null),
    injectT
)(CreatePageContainer);