/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {OneColumn} from "ndla-ui";
import TextArea from "./TextArea";
import Input from "./Input";
import BEMHelper from "react-bem-helper";
import PropTypes from 'prop-types';

import Meta from "./Meta";
import DropDown from "./DropDown";



const classes = new BEMHelper({
    name: 'update-form',
    prefix: 'c-',
});

class Concept extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
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
    }

    onChangeStatus(e) {
        this.setState({currentStatus: this.props.status.find(x => x.id+"" === e.target.value)});
    }


    onChangeConcept(key, {target: {value}}) {
        const {concept} = this.state;
        this.setState({concept: {...concept, [key]: value}})
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

    submit(e) {
        e.preventDefault();
        this.props.onConceptDone({...this.state.concept, meta: Object.values(this.state.metas), status: this.state.currentStatus});
    }

    render() {
        const { t, title: pageTitle} = this.props;
        const {author, title, content, externalId, source} = this.state.concept;
        return (
            <OneColumn>
                <h1>{t(pageTitle)}</h1>
                <form onSubmit={this.submit} {...classes()}>
                    <Input id="author" value={author} label={t("author")} onChange={this.authorChange} {...classes('form-field')}  />
                    <Input id="title" value={title} label={t("title")} onChange={this.titleChange} {...classes('form-field')} />
                    <TextArea id="content" value={content} label={t("content")} onChange={this.contentChange} {...classes('form-field')} />
                    <Input id="externalId" value={externalId} label={t("externalId")} onChange={this.externalIdChange} {...classes('form-field')} />
                    <Input id="source" value={source} label={t("source")} onChange={this.sourceChange} {...classes('form-field')} />
                    <DropDown items={this.props.status}
                              selected={this.state.currentStatus}
                              onChange={this.onChangeStatus}
                              id={"status"}
                              label={this.capitalizeText(t("status"))}
                              {...classes('form-field')} />

                    {this.props.metas.map(
                        meta => <Meta onChange={this.onChangeMeta}
                                      key={meta.category.name.toLowerCase()}
                                      t={t} choices={meta.metaList}
                                      id={meta.category.name.toLowerCase()}
                                      buttonText={`${t("addButton")} ${meta.category.description.toLowerCase()}`}
                                      labelText={this.capitalizeText(meta.category.description.toLowerCase())}
                                      classes={classes('form-field')}
                                      current={this.getCurrentMeta(meta.category.description)} />
                    )}
                    <button className="c-button" type="submit">{t(pageTitle)}</button>
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
};

Concept.propTypes = {
    concept: PropTypes.object,
    status: PropTypes.array.isRequired,
    t: PropTypes.func.isRequired,
    metas: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onConceptDone: PropTypes.func
}

export default Concept;