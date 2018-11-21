/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {OneColumn} from "ndla-ui";
import BEMHelper from "react-bem-helper";
import PropTypes from 'prop-types';
import { uuid } from 'ndla-util';

import Meta from "../Meta";
import ConfirmModal from "../ConfirmModal/index";

import './style.css'
import {FIELDS} from "./fields";
import {Field, reduxForm} from "redux-form";

import {validate} from "./validate";
import {onChange} from "./onchange";

const classes = new BEMHelper({
    name: 'concept-form',
    prefix: 'c-',
});

class Concept extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
    }

    onSubmit(values) {
        console.log("submitting form", values)
        // TODO map values to concept
        //this.props.submit({});
    }

    renderSubmitButton() {
        return <button className="c-button" type="submit">{(this.props.title)}</button>;
    }

    render() {
        const { t, title: pageTitle, handleSubmit} = this.props;

        // TODO fjern
        this.props.metas.forEach(elm => {
            if (elm.category.description === "Subject")
                elm.category.description = "Fag";
            if (elm.category.description === "Language")
                elm.category.description = "Språk";
            if (elm.category.description === "Licence")
                elm.category.description = "Lisens";
        })


        let draft = this.props.status.find(x => x.name === "Draft");
        if (!draft)
            draft = this.props.status[0];
        let selectedStatus = {value: draft.id, label: draft.name};

        const options = this.props.status.map(x => ({value: x.id, label: x.name}));

        return (
            <OneColumn>
                <h1>{pageTitle}</h1>
                <form onSubmit={handleSubmit(this.onSubmit)} {...classes()}>
                    <Field {...FIELDS.title} t={t} {...classes('form-field')} />
                    <Field {...FIELDS.content} t={t} {...classes('form-field')} />
                    <Field {...FIELDS.source} t={t} {...classes('form-field')} />
                    <Field {...FIELDS.author} t={t} {...classes('form-field')} />

                    <div {...classes('form-field')}>
                        <label  htmlFor={FIELDS.status.id}>{t("conceptForm.status")}</label>
                        <Field {...FIELDS.status} t={t} selected={selectedStatus} options={options}/>
                    </div>
                    {this.props.showTimestamps && <Field {...FIELDS.created} t={t} {...classes('form-field')} />}
                    {this.props.showTimestamps && <Field {...FIELDS.updated} t={t} {...classes('form-field')} />}

                    <div {...classes('meta')}>
                        <hr />
                        <h2>Meta</h2>
                        <hr/>
                    </div>

                    {this.props.metas.map(meta => <Meta key={uuid()} meta={meta} t={t} classes={classes} />)}

                    {this.props.children}
                    <ConfirmModal triggerButton={this.renderSubmitButton} onConfirm={this.submit} />
                </form>
            </OneColumn>
        )
    }
}

Concept.defaultProps = {
    showTimestamps: false,
};

Concept.propTypes = {
    status: PropTypes.array.isRequired,
    t: PropTypes.func.isRequired,
    metas: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    submit: PropTypes.func,
    showTimestamps: PropTypes.bool,
    locale: PropTypes.string,
};

export default reduxForm({
    validate,
    form: 'conceptForm',
    onChange,
})(Concept);