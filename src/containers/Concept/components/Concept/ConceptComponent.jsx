/**
 * Copyright (c) 2018-present, NDLA.
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
import Button from '@ndla/button';

import Meta from "../Meta";
import ConfirmModal from "../../../../components/ConfirmModal/";
import { GetValuesFromObjectByKeyPrefix} from "../../../../utilities";

import {validate} from "./validate";
import {FIELDS} from "./fields";
import MediaListItem from "../Media/MediaListItemComponent";
import AudioSearch from "../Media/AudioSearch";
import ImageSearch from "../Media/ImageSearch";
import AudioApi from "../../../../services/audioApiService";
import ImageApi from "../../../../services/ImageApiService";

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
        this.renderAddMediaButton = this.renderAddMediaButton.bind(this);
    }

    componentDidMount() {
        // InitialValues is not filled out for form on page CreateConcept if navigated by menu.
        // However, navigation by reloading page do. This is a solution to circumvent that problem.
        this.props.initialize(this.props.initialValues);
    }

    onSubmit(values) {
        const all_meta = GetValuesFromObjectByKeyPrefix(values, "meta_");

        const getIds = list => list.map(x => x.value) || [];

        const meta_from_list = all_meta.filter(x => Array.isArray(x)).reduce((a, b) => a.concat(b), []);
        const meta_from_objects =  all_meta.filter(x => !Array.isArray(x));

        const meta = getIds(meta_from_objects).concat(getIds(meta_from_list));
        const {externalId = -1, statusId, content, title, sourceAuthor, source = null, id = -1} = values;

        if (! statusId)
            return;


        const concept = {
            id,
            statusId: statusId.value,
            externalId,
            content,
            title,
            sourceAuthor,
            source,
            metaIds: meta
        };
        return this.props.submitConcept(concept).catch(errors => {
            if (errors) {
                errors['_error'] = errors['metaIds'];
                throw new SubmissionError(errors);
            }
        });
    }

    renderSubmitButton() {
        const {isReadOnly, submitting, title} = this.props;
        return <Button disabled={isReadOnly || submitting} >{(title)}</Button>;
    }
    renderAddMediaButton() {
        const {isReadOnly, submitting} = this.props;
        return <Button disabled={isReadOnly || submitting} >Add media</Button>;
    }

    renderFieldsSection() {

        const { t, status, initialValues, locale} = this.props;
        return (
            <React.Fragment>
                <Field {...this.fields.title} t={t} {...classes('form-field')} />
                <Field {...this.fields.content} t={t} {...classes('form-field')} />
                <Field {...this.fields.author} t={t} {...classes('form-field')} />
                <Field {...this.fields.source} t={t} {...classes('form-field')} />

                <div {...classes('form-field')}>
                    <label  htmlFor={this.fields.status.id}>{t("conceptForm.status")}</label>
                    <Field {...this.fields.status} t={t} selected={initialValues.statusId} options={status}/>
                </div>
                {this.props.showTimestamps && <Field {...this.fields.created} t={t} {...classes('form-field')} locale={locale} />}
                {this.props.showTimestamps && <Field {...this.fields.updated} t={t} {...classes('form-field')} locale={locale} />}
            </React.Fragment>
        )
    }

    renderMetaSection() {
        const { t, initialValues, error, isReadOnly} = this.props;

        return  (
            <React.Fragment>
                <div {...classes('section')}>
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
            </React.Fragment>);
    }

    renderMediaSection() {
        const {media, t} = this.props;

        return (
            <React.Fragment>
                <div {...classes('section')}>
                    <hr />
                    <h2>Media</h2>
                    <hr/>
                </div>
                {Boolean(media.length === 0) && <p>Ingen medier er lagt til</p>}

                {media.map(m => <MediaListItem media={m} classes={classes('form-field')} />)}
                <AudioSearch t={t} api={new AudioApi("https://test.api.ndla.no")} locale={'nb'} triggerButton={this.renderAddMediaButton}/>
                <ImageSearch t={t} api={new ImageApi("https://test.api.ndla.no")} locale={'nb'} triggerButton={this.renderAddMediaButton}/>
            </React.Fragment>
        )
    }

    render() {
        const { t, handleSubmit} = this.props;
        const submit = handleSubmit(this.onSubmit);

        return (
                <form onSubmit={submit} {...classes()}>
                    {this.renderFieldsSection()}

                    {this.renderMetaSection()}

                    {this.renderMediaSection()}

                    {this.props.children}
                    <ConfirmModal t={t} triggerButton={this.renderSubmitButton} onConfirm={submit}/>
                </form>
        )
    }
}

Concept.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    metas: PropTypes.array.isRequired,
    media: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.array.isRequired,
    initialize: PropTypes.func.isRequired,
    submitConcept: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,

    // Optional
    error: PropTypes.string,
    locale: PropTypes.string,
    isReadOnly: PropTypes.bool,
    submitting: PropTypes.bool,
    showTimestamps: PropTypes.bool,
    initialValues: PropTypes.object,
};

Concept.defaultProps = {
    isReadOnly: false,
    showTimestamps: false,
};

export default reduxForm({
    validate,
    form: 'conceptForm',
    enableReinitialize: true,
})(Concept);