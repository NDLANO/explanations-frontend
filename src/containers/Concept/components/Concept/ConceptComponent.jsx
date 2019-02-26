/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import _ from 'lodash';
import React from 'react';
import Button from '@ndla/button';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";
import Plus from "@ndla/icons/es/action/Plus";
import {Field, FieldArray, reduxForm, SubmissionError, arrayPush} from "redux-form";

import Meta from "../Meta";
import ConfirmModal from "../../../../components/ConfirmModal/";
import { GetValuesFromObjectByKeyPrefix} from "../../../../utilities";

import {validate} from "./validate";
import {FIELDS} from "./fields";
import AddNewMedia from "../Media/AddNewMedia";
import Media from "../Media/MediaComponent";

const classes = new BEMHelper({
    name: 'concept-form',
    prefix: 'c-',
});

export const CONCEPT_FORM_NAME = 'conceptForm';

const SectionComponent = ({title}) =>
    <div {...classes('section')}>
        <hr />
        <h2>{title}</h2>
        <hr />
    </div>;

SectionComponent.propTypes = {
    title: PropTypes.string.isRequired,
};

class Concept extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaModalIsOpen: false
        };
        this.fields = {...FIELDS};
        _.forEach(this.fields, field => {
            if (props.isReadOnly) {
                field['readOnly'] = true;
                field['required'] = false;
            }
            return field;
        });

        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectMedia = this.onSelectMedia.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.renderMediaSection = this.renderMediaSection.bind(this);
        this.closeMediaModal = this.closeMediaModal.bind(this);
        this.openMediaModal = this.openMediaModal.bind(this);
        this.renderMediaFields = this.renderMediaFields.bind(this);
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
        const {media = []} = values;

        if (! statusId)
            return;

        const concept = {
            id,
            statusId: statusId,
            externalId,
            content,
            title,
            sourceAuthor,
            source,
            metaIds: meta,
            media,
            languageId: 1
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
        return <Button disabled={isReadOnly || submitting} className="form-button">{(title)}</Button>;
    }

    renderFieldsSection() {

        const { t, status, locale} = this.props;
        return (
            <React.Fragment>
                <Field {...this.fields.title}   t={t} {...classes('form-field')} />
                <Field {...this.fields.content} t={t} {...classes('form-field')} />
                <Field {...this.fields.author}  t={t} {...classes('form-field')} />
                <Field {...this.fields.source}  t={t} {...classes('form-field')} />

                <div {...classes('form-field')}>
                    <label  htmlFor={this.fields.status.id}>{t("conceptForm.status")}</label>
                    <Field {...this.fields.status} options={status}/>
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
                <SectionComponent title="Meta" />
                {error && <span {...classes('form-field', 'validation-error--meta')}>{error}</span>}
                {this.props.metas.map(meta => {
                    return <Meta meta={meta}
                                 initialValues={initialValues}
                                 key={meta.category.id}
                                 t={t}
                                 classes={classes}
                                 readOnly={isReadOnly}/>
                    }
                )}
            </React.Fragment>);
    }

    onSelectMedia(media) {
        if (media)
            this.props.dispatch(arrayPush(CONCEPT_FORM_NAME, 'media', media));
        // TODO else send flashMessage saying cannot add media...
        this.closeMediaModal();
    }
    openMediaModal() {
        this.setState({mediaModalIsOpen: true});
    }
    closeMediaModal() {
        this.setState({mediaModalIsOpen: false});
    }

    renderMediaSection() {
        const {t, locale, isReadOnly, submitting} = this.props;
        const disabled = isReadOnly || submitting;
        return (
            <React.Fragment>
                <SectionComponent title="Media" />

                <FieldArray name="media" component={this.renderMediaFields} />

                {Boolean(!disabled) &&
                    <AddNewMedia
                        t={t}
                        locale={locale}
                        close={this.closeMediaModal}
                        onSelectMedia={this.onSelectMedia}
                        isOpen={this.state.mediaModalIsOpen}
                        mediaTypes={this.props.mediaTypes}
                    />
                }
                {!disabled && <Plus onClick={() => this.openMediaModal()} className="c-icon--large" />}
            </React.Fragment>
        )
    }

    renderMediaFields({fields}){

        const {isReadOnly, submitting, t} = this.props;

        const disabled = isReadOnly || submitting;
        return (
            <React.Fragment>
                {Boolean(fields.length === 0) && <p {...classes('message')}>{this.props.t('conceptForm.noMedia')}</p>}

                {fields.map((mediaName, index) => {
                    const media = fields.get(index);
                    return <Field
                        key={media.previewUrl}
                        name={mediaName}
                        classes={classes}
                        isReadOnly={isReadOnly}
                        disabled={disabled}
                        itemIndex={index}
                        t={t}
                        deleteMedia={() => fields.remove(index)}
                        media={media}
                        component={Media} />
                    }
                )}

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
    status: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    mediaTypes: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitConcept: PropTypes.func.isRequired,

    // Optional
    error: PropTypes.string,
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
    form: CONCEPT_FORM_NAME,
    enableReinitialize: true,
})(Concept);