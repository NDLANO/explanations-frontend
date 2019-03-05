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

import Meta, {dropdownFormat, metaNamePrefix} from "../Meta";
import ConfirmModal from "../../../../components/ConfirmModal/";
import {capitalizeText, GetValuesFromObjectByKeyPrefix} from "../../../../utilities";

import {validate} from "./validate";
import {FIELDS} from "./fields";
import AddNewMedia from "../Media/AddNewMedia";
import Media from "../Media/MediaComponent";
import Loading from "../../../../components/Loading/LoadingComponent";
import WithEither from "../../../../components/HOC/WithEither";
import {metaExists, statusExists} from "../../conceptCommon";
import Dropdown from "../../../../components/Dropdown";
import FormSelect from "../../../../components/FormSelect";
import Select from 'react-select';

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
            mediaModalIsOpen: false,
            metas: [],
            categories: [],
            status: [],
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
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
    }

    onChangeLanguage(data) {
        if (data.type && data.type.toLowerCase() === "language")
            this.loadData(this.state.metas.find(x => x.languageVariation === data.languageVariation).abbreviation)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.locale !== this.props.locale) {
            this.loadData(this.props.locale);
        }
    }

    componentDidMount() {
        this.loadData(this.props.initialValues.language.abbreviation || this.props.locale);
    }

    loadData(language) {
        const {apiService} = this.props;
        const searchParams = new URLSearchParams();
        searchParams.append('language', language);
        searchParams.append('pageSize', '100');
        searchParams.append('page', '1');
        const param = searchParams.toString();

        apiService.get(apiService.endpoints.status, param).then(data => this.setState({status: data.results}));
        apiService.get(apiService.endpoints.meta, param).then(data => this.setState({metas: data.results}));
        apiService.get(apiService.endpoints.category, param).then(data => this.setState({categories: data.results}));
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
            statusId,
            externalId,
            content,
            title,
            sourceAuthor,
            source,
            metaIds: meta,
            media,
            languageId: 1 // TODO
        };
        return this.props.submitConcept(concept).catch(errors => {
            if (errors) {
                errors['_error'] = errors['metaIds'];
                throw new SubmissionError(errors);
            }
        });
    }

    isDisabled() {
        const {isReadOnly, submitting} = this.props;
        return isReadOnly || submitting;
    }

    renderSubmitButton() {
        const { title} = this.props;
        return <Button disabled={this.isDisabled()} className="form-button">{(title)}</Button>;
    }

    renderFieldsSection() {

        const { t, locale} = this.props;
        return (
            <React.Fragment>
                <Field {...this.fields.title}   t={t} {...classes('form-field')} />
                <Field {...this.fields.content} t={t} {...classes('form-field')} />
                <Field {...this.fields.author}  t={t} {...classes('form-field')} />
                <Field {...this.fields.source}  t={t} {...classes('form-field')} />

                {this.renderStatus()}
                {this.props.showTimestamps && <Field {...this.fields.created} t={t} {...classes('form-field')} locale={locale} />}
                {this.props.showTimestamps && <Field {...this.fields.updated} t={t} {...classes('form-field')} locale={locale} />}
            </React.Fragment>
        )
    }

    renderStatus() {
        const {t} = this.props;

        // WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
        return (
            <div {...classes('form-field')}>
                <label  htmlFor={this.fields.status.id}>{t("conceptForm.status")}</label>
                <Field {...this.fields.status} options={this.state.status.map(x => dropdownFormat(x))} isDisabled={this.isDisabled()}/>
            </div>
        )
    }

    renderMetaSection() {
        const {error, t} = this.props;
        let meta = this.state.categories.map(category => {
            const options = this.state.metas
                .filter(meta => meta.category.id === category.id)
                .map(x => dropdownFormat(x, x.category.typeGroup.name));

            return (
                <div {...classes('form-field')}>
                    <label>{capitalizeText(t(`phrases.${category.typeGroup.name.toLowerCase()}`))}</label>

                    <Field name={metaNamePrefix(category.typeGroup.name.toLowerCase())}
                           isDisabled={this.isDisabled()}
                           component={Select}
                           isSearcable={true}
                           isMulti={category.canHaveMultiple}
                           className="form-dropdown"
                           key={metaNamePrefix(category.typeGroup.name.toLowerCase())}
                           onChange={this.onChangeLanguage}
                           onBlur={() => console.log()}
                           options={options}/>
                    {/*
                    <Field name={metaNamePrefix(category.typeGroup.name.toLowerCase())}
                           isDisabled={this.isDisabled()}
                           component={FormSelect}
                           isSearcable={true}
                           isMulti={category.canHaveMultiple}
                           className="form-dropdown"
                           key={metaNamePrefix(category.typeGroup.name.toLowerCase())}
                           onChange={this.onChangeLanguage}
                           options={options}/>
                           */}
                </div>
            );
        });

        return  (
            <React.Fragment>
                <SectionComponent title="Meta" />
                {error && <span {...classes('form-field', 'validation-error--meta')}>{error}</span>}
                {meta ? meta : <Loading message="loadingMessage.loadingMeta"/>}
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
        const {t, locale} = this.props;
        return (
            <React.Fragment>
                <SectionComponent title="Media" />

                <FieldArray name="media" component={this.renderMediaFields} />

                {Boolean(!this.isDisabled()) &&
                    <AddNewMedia
                        t={t}
                        locale={locale}
                        close={this.closeMediaModal}
                        onSelectMedia={this.onSelectMedia}
                        isOpen={this.state.mediaModalIsOpen}
                        mediaTypes={this.props.mediaTypes}
                    />
                }
                {!this.isDisabled() && <Plus onClick={() => this.openMediaModal()} className="c-icon--large" />}
            </React.Fragment>
        )
    }

    renderMediaFields({fields}){

        const {isReadOnly, t} = this.props;

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
                        disabled={this.isDisabled()}
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