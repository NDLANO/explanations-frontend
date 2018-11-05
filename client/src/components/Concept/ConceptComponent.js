/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {OneColumn} from "ndla-ui";
import TextArea from "../TextArea";
import Input from "../Input";
import BEMHelper from "react-bem-helper";
import PropTypes from 'prop-types';

import Meta from "../Meta";
import Dropdown from "../Dropdown/index";
import ConfirmModal from "../ConfirmModal/index";
import DateTime from "../DateTime";

import './style.css'

const classes = new BEMHelper({
    name: 'concept-form',
    prefix: 'c-',
});

class Concept extends React.Component {
    constructor(props) {
        super(props);

        const metas = {};
        props.concept.meta.forEach(m => metas[m.category.name.toLowerCase()] = m);

        this.state = {
            concept: props.concept,
            metas: metas,
            currentStatus: props.concept.status || props.status[0]
        };


        this.authorChange = this.onChangeConcept.bind(this, "author");
        this.titleChange = this.onChangeConcept.bind(this, "title");
        this.contentChange = this.onChangeConcept.bind(this, "content");
        this.externalIdChange = this.onChangeConcept.bind(this, "externalId");
        this.sourceChange = this.onChangeConcept.bind(this, "source");
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.submit = this.submit.bind(this);
        this.onChangeMeta = this.onChangeMeta.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
    }

    onChangeStatus(e) {
        this.setState({currentStatus: this.props.status.find(x => x.id+"" === e.target.value)});
    }


    onChangeConcept(key, {target: {value}}) {
        this.setState(state => ({concept: {...state.concept, [key]: value}}));
    }

    onChangeMeta(categoryName, metaId) {
        const category = this.props.metas.find(x => x.category.name.toLowerCase() === categoryName.toLowerCase());
        if (!category)
            console.error("fant ingen kategory for ", categoryName);

        const meta  = category.metaList.find(x => x.id+"" === metaId+"");
        if (!meta)
            console.error("fant ingen meta ved kategori", categoryName, "og id", metaId);

        this.setState(state => ({metas: {...state.metas, [categoryName]: meta}}));
    }

    getCurrentMeta(key) {
        try{
            return this.state.metas[key.toLowerCase()]
        }catch(e) {
            return ""
        }
    }

    capitalizeText(text) {
        return text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
    }

    submit() {
        console.log({...this.state.concept})
        this.props.onConceptDone({...this.state.concept, meta: Object.values(this.state.metas), status: this.state.currentStatus});
    }

    preventFormSubmission(e) {
        e.preventDefault();
    }

    renderSubmitButton() {
        return <button className="c-button" type="submit">{(this.props.title)}</button>;
    }

    render() {
        const { t, title: pageTitle, locale} = this.props;
        const {author, title, content, externalId, source, created, updated} = this.state.concept;

        // TODO fjern
        this.props.metas.forEach(elm => {
            if (elm.category.description === "Subject")
                elm.category.description = "Fag";
            if (elm.category.description === "Language")
                elm.category.description = "Språk";
            if (elm.category.description === "Licence")
                elm.category.description = "Lisens";
        })


        return (
            <OneColumn>
                <h1>{pageTitle}</h1>
                <form onSubmit={this.preventFormSubmission} {...classes()}>
                    <Input id="title" value={title} label={t("conceptForm.title")} onChange={this.titleChange} {...classes('form-field')} />
                    <TextArea id="content" value={content} label={t("conceptForm.content")} onChange={this.contentChange} {...classes('form-field')} />
                    {/*<Input id="externalId" value={externalId} label={t("conceptForm.externalId")} onChange={this.externalIdChange} {...classes('form-field')} />*/}
                    <Input id="source" value={source} label={t("conceptForm.source")} onChange={this.sourceChange} {...classes('form-field')} />
                    <Input id="author" value={author} label={t("conceptForm.author")} onChange={this.authorChange} {...classes('form-field')}  />
                    <Dropdown items={this.props.status}
                              selected={this.state.currentStatus}
                              onChange={this.onChangeStatus}
                              id={"status"}
                              label={this.capitalizeText(t("conceptForm.status"))}
                              {...classes('form-field')} />
                    {this.props.showTimestamps && <DateTime id="created" value={created} label={t("conceptForm.created")} locale={locale} {...classes('form-field')} />}
                    {this.props.showTimestamps && <DateTime id="updated" value={updated} label={t("conceptForm.updated")} locale={locale} {...classes('form-field')} />}

                    <div {...classes('meta')}>
                        <hr />
                        <h2>Meta</h2>
                        <hr/>
                    </div>

                    {this.props.metas.map(
                        meta => <Meta onChange={this.onChangeMeta}
                                      key={meta.category.name.toLowerCase()}
                                      t={t} choices={meta.metaList}
                                      id={meta.category.name.toLowerCase()}
                                      buttonText={`${t("conceptForm.button.addMeta")} ${meta.category.description.toLowerCase()}`}
                                      labelText={this.capitalizeText(meta.category.description.toLowerCase())}
                                      classes={classes('form-field')}
                                      current={this.getCurrentMeta(meta.category.name)} />
                    )}

                    {this.props.children}
                    <ConfirmModal triggerButton={this.renderSubmitButton} onConfirm={this.submit} />
                </form>
            </OneColumn>
        )
    }
}


Concept.defaultProps = {
    concept:  {
        title: "",
        content: "",
        externalId: -1,
        author: "",
        source: "",
        meta: []
    },
    showTimestamps: false,
};

Concept.propTypes = {
    concept: PropTypes.object,
    status: PropTypes.array.isRequired,
    t: PropTypes.func.isRequired,
    metas: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onConceptDone: PropTypes.func,
    showTimestamps: PropTypes.bool,
    locale: PropTypes.string,
};

export default Concept;