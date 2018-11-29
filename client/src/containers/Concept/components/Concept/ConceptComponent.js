/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import BEMHelper from "react-bem-helper";
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Field, reduxForm, SubmissionError} from "redux-form";
import {Button, OneColumn} from "ndla-ui";

import Meta from "../Meta";
import ConfirmModal from "../../../../components/ConfirmModal/";
import { GetValuesFromObjectByKeyPrefix} from "../../../../utilities";

import {validate} from "./validate";
import {FIELDS} from "./fields";
import './style.css'

const classes = new BEMHelper({
    name: 'concept-form',
    prefix: 'c-',
});

class Concept extends React.Component {
    constructor(props) {
        super(props);

        this.fields = {...FIELDS};
        _.forEach(this.fields, field => {
            if (props.isReadOnly) {
                field['readOnly'] = true;
                field['required'] = false;
            }
            return field;
        });

        this.onSubmit = this.onSubmit.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
    }

    onSubmit(values) {
        const meta = GetValuesFromObjectByKeyPrefix(values, "meta_").map(x => x.value);
        const {externalId = -1, statusId, content, title, author, source = null, id = -1} = values;

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
        return <Button>{(this.props.title)}</Button>;
    }

    render() {
        const { t, title: pageTitle, handleSubmit, status, initialValues, error, submitting, isReadOnly} = this.props;
        this.props.metas.forEach(elm => {
            if (elm.category.description === "Subject")
                elm.category.description = "Fag";
            if (elm.category.description === "Language")
                elm.category.description = "Språk";
            if (elm.category.description === "Licence")
                elm.category.description = "Lisens";
        });

        const submit = handleSubmit(this.onSubmit);

        return (
            <OneColumn>
                <h1>{pageTitle}</h1>
                <form onSubmit={submit} {...classes()}>
                    <Field {...this.fields.title} t={t} {...classes('form-field')} />
                    <Field {...this.fields.content} t={t} {...classes('form-field')} />
                    <Field {...this.fields.author} t={t} {...classes('form-field')} />
                    <Field {...this.fields.source} t={t} {...classes('form-field')} />

                    <div {...classes('form-field')}>
                        <label  htmlFor={this.fields.status.id}>{t("conceptForm.status")}</label>
                        <Field {...this.fields.status} t={t} selected={initialValues.statusId} options={status}/>
                    </div>
                    {this.props.showTimestamps && <Field {...this.fields.created} t={t} {...classes('form-field')} />}
                    {this.props.showTimestamps && <Field {...this.fields.updated} t={t} {...classes('form-field')} />}

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
                                                        classes={classes}
                                                        readOnly={isReadOnly}/>
                        )}

                    {this.props.children}
                    <ConfirmModal t={t} triggerButton={this.renderSubmitButton} onConfirm={submit} disabled={submitting || isReadOnly} />
                </form>
            </OneColumn>
        )
    }
}

Concept.defaultProps = {
    showTimestamps: false,
    isReadOnly: false
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
    isReadOnly: PropTypes.bool
};

export default reduxForm({
    validate,
    form: 'conceptForm',
    enableReinitialize: true,
})(Concept);