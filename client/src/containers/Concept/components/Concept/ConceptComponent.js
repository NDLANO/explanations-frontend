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

import Meta from "../Meta";
import ConfirmModal from "../../../../components/ConfirmModal/";

import './style.css'
import {FIELDS} from "./fields";
import {Field, reduxForm, SubmissionError} from "redux-form";

import {validate} from "./validate";
import { GetValuesFromObjectByKeyPrefix} from "../../../../utilities";

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
        const meta = GetValuesFromObjectByKeyPrefix(values, "meta_").map(x => x.value);
        const {externalId = -1, statusId, content, title, author, source = null, id = -1} = values;
        console.log(values, statusId)
        if (! statusId)
            return;

        const concept = {
            id,
            statusId: statusId.value,
            externalId,
            content,
            title,
            author,
            source,
            metaIds: meta
        };
        return this.props.submitConcept(concept).catch(err => {
            const {errors} = err.response.data;
            if (errors) {
                errors['_error'] = errors['metaIds'];
                throw new SubmissionError(errors);
            }
        });
    }

    renderSubmitButton() {
        return <button className="c-button" type="button">{(this.props.title)}</button>;
    }

    render() {
        const { t, title: pageTitle, handleSubmit, status, initialValues, error, submitting} = this.props;
        this.props.metas.forEach(elm => {
            if (elm.category.description === "Subject")
                elm.category.description = "Fag";
            if (elm.category.description === "Language")
                elm.category.description = "Språk";
            if (elm.category.description === "Licence")
                elm.category.description = "Lisens";
        })

        const submit = handleSubmit(this.onSubmit);

        return (
            <OneColumn>
                <h1>{pageTitle}</h1>
                <form onSubmit={submit} {...classes()}>
                    <Field {...FIELDS.title} t={t} {...classes('form-field')} />
                    <Field {...FIELDS.content} t={t} {...classes('form-field')} />
                    <Field {...FIELDS.author} t={t} {...classes('form-field')} />
                    <Field {...FIELDS.source} t={t} {...classes('form-field')} />

                    <div {...classes('form-field')}>
                        <label  htmlFor={FIELDS.status.id}>{t("conceptForm.status")}</label>
                        <Field {...FIELDS.status} t={t} selected={initialValues.statusId} options={status}/>
                    </div>
                    {this.props.showTimestamps && <Field {...FIELDS.created} t={t} {...classes('form-field')} />}
                    {this.props.showTimestamps && <Field {...FIELDS.updated} t={t} {...classes('form-field')} />}

                    <div {...classes('meta')}>
                        <hr />
                        <h2>Meta</h2>
                        <hr/>
                    </div>
                    {error && <span {...classes('form-field', 'validation-error--meta')}>{error}</span>}

                    {this.props.metas.map(meta => <Meta meta={meta}
                                                        initialValues={initialValues}
                                                        key={meta.category.id}
                                                        t={t}
                                                        classes={classes} />
                        )}

                    {this.props.children}
                    <ConfirmModal t={t} triggerButton={this.renderSubmitButton} onConfirm={submit} disabled={submitting} />
                </form>
            </OneColumn>
        )
    }
}

Concept.defaultProps = {
    showTimestamps: false,
};

Concept.propTypes = {
    // Required
    status: PropTypes.array.isRequired,
    t: PropTypes.func.isRequired,
    metas: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    submitConcept: PropTypes.func.isRequired,

    // Optional
    showTimestamps: PropTypes.bool,
    locale: PropTypes.string,
    initialValues: PropTypes.object,
};

export default reduxForm({
    validate,
    form: 'conceptForm',
})(Concept);