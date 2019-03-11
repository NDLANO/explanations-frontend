/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import Button from '@ndla/button';
import _ from 'lodash';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";
import Plus from "@ndla/icons/es/action/Plus";
import CheckboxItem from "@ndla/forms/es/CheckboxItem";
import {Field, FieldArray, reduxForm, SubmissionError, arrayPush} from "redux-form";

import ConfirmModal from "../../../../components/ConfirmModal/";
import {GetValuesFromObjectByKeyPrefix} from "../../../../utilities";
import {validate} from "./validate";
import {FIELDS} from "./fields";
import AddNewMedia from "../Media/AddNewMedia";
import Media from "../Media/MediaComponent";
import Loading from "../../../../components/Loading/LoadingComponent";
import Meta, {metaNamePrefix} from "../Meta";
import {dropdownFormat} from "../../conceptCommon";
import SectionComponent from "../SectionComponent";
import ApiService from "../../../../services/apiService";

const classes = new BEMHelper({
    name: 'concept-form',
    prefix: 'c-',
});

export const CONCEPT_FORM_NAME = 'conceptForm';

class Concept extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaModalIsOpen: false,
            meta: props.meta,
            categories: props.categories,
            status: props.status,
            useLanguageVariation: props.isLanguageVariation
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectMedia = this.onSelectMedia.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.renderMediaSection = this.renderMediaSection.bind(this);
        this.closeMediaModal = this.closeMediaModal.bind(this);
        this.openMediaModal = this.openMediaModal.bind(this);
        this.renderMediaFields = this.renderMediaFields.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateMeta = this.updateMeta.bind(this);
        this.submitFailed = this.submitFailed.bind(this);
        this.updateLanguageVariation = this.updateLanguageVariation.bind(this);
    }

    onChangeLanguage(data) {
        let languageVariation = "";
        for(let i = 0; i < Object.keys(data).length; i++) {
            if (data[i])
                languageVariation += data[i];
        }
        const meta = this.state.meta.find(x => x.languageVariation === languageVariation);
        if (meta && meta.category.typeGroup.name.toLowerCase() === "language")
            this.loadData(meta.abbreviation)
    }

    componentDidMount() {
        this.props.initialize(this.props.initialValues);
        const locale = _.get(this.props.initialValues, 'language.abbreviation');
        if (locale)
            this.loadData(locale);
        else
            this.loadData(this.props.locale);
    }

    loadData(language) {
        this.setState({
            meta: [],
            categories: [],
            status: []
        });
        const {apiService} = this.props;
        const searchParams = new URLSearchParams();
        searchParams.append('language', language);
        searchParams.append('pageSize', '100');
        searchParams.append('page', '1');
        const param = searchParams.toString();

        apiService.get(apiService.endpoints.status, param).then(this.updateStatus);

        Promise.all([
            apiService.get(apiService.endpoints.category, param),
            apiService.get(apiService.endpoints.meta, param)
        ]).then(this.updateMeta);
    }

    updateStatus({results: status}) {
        this.setState({status: status.map(x => dropdownFormat(x))});
    }
    updateMeta([{results: categories}, {results: meta}]) {
        this.setState({meta: meta.map(x => dropdownFormat(x)), categories: categories.map(x => dropdownFormat(x))});
    }

    onSubmit(values) {
        const all_meta = GetValuesFromObjectByKeyPrefix(values, "meta_");
        const getMetaIds = list => list.map(x => {
            const m = this.state.meta.find(y => y.languageVariation === x);
            if (m)
                return m.id;
            return null;
        }) || [];

        const meta_from_list = all_meta.filter(x => Array.isArray(x)).reduce((a, b) => a.concat(b), []);
        const meta_from_objects =  all_meta.filter(x => !Array.isArray(x));

        const meta = getMetaIds(meta_from_objects).concat(getMetaIds(meta_from_list));
        const {
            externalId = -1,
            statusId: statusLanguageVariation,
            content,
            title,
            sourceAuthor,
            source = null,
            id = -1,
            media = [],
            groupId,
        } = values;
        const status = this.state.status.find(x => x.languageVariation === statusLanguageVariation);
        if (!status)
            return;

        media.forEach(m => m.mediaTypeId = m.mediaType.id);

        const concept = {
            id,
            statusId: status.id,
            externalId,
            content,
            title,
            sourceAuthor,
            source,
            metaIds: meta,
            media
        };
        if (this.state.useLanguageVariation && groupId)
            concept['groupId'] = groupId;

        return this.props.submitConcept(concept).catch(this.submitFailed);
    }

    submitFailed({errors}) {
        if (errors) {
            if (errors['metaIds']) {
                this.state.categories.forEach(category =>
                    errors[metaNamePrefix(category.typeGroup.name.toLowerCase())] = errors['metaIds']
                )
            }
            throw new SubmissionError(errors);
        }
    }

    updateLanguageVariation() {
        this.setState(prev =>( {useLanguageVariation: !prev.useLanguageVariation}));
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

        const { t, locale, isLanguageVariation} = this.props;
        return (
            <React.Fragment>
                <Field {...FIELDS.title}   t={t} {...classes('form-field')} readOnly={this.isDisabled()}/>
                <Field {...FIELDS.content} t={t} {...classes('form-field')} readOnly={this.isDisabled()} />
                <Field {...FIELDS.author}  t={t} {...classes('form-field')} readOnly={this.isDisabled()} />
                <Field {...FIELDS.source}  t={t} {...classes('form-field')} readOnly={this.isDisabled()} />

                {this.renderStatus()}
                {this.props.showTimestamps && <Field {...FIELDS.created} t={t} {...classes('form-field')} locale={locale} />}
                {this.props.showTimestamps && <Field {...FIELDS.updated} t={t} {...classes('form-field')} locale={locale} />}

                {
                    isLanguageVariation && (
                        <div {...classes('form-field')}>
                            <Field {...FIELDS.groupId} t={t} {...classes('form-field')} readOnly={this.isDisabled()} />
                            <label  htmlFor={FIELDS.groupId}>{t("conceptForm.isLanguageVariation")}</label>
                            <CheckboxItem id="concept-is-language-variation"
                                          onChange={this.updateLanguageVariation}
                                          checked={this.state.useLanguageVariation}
                                          readOnly={this.isDisabled()} />
                        </div>
                    )
                }
            </React.Fragment>
        )
    }

    renderStatus() {
        const {t} = this.props;

        if (this.state.status.length === 0)
            return <Loading message="loadingMessage.loadingStatus"/>;

        return (
            <div {...classes('form-field')}>
                <label  htmlFor={FIELDS.status.id}>{t("conceptForm.status")}</label>
                <Field {...FIELDS.status} options={this.state.status} isDisabled={this.isDisabled()}/>
            </div>
        )
    }

    renderMetaSection() {
        const {t} = this.props;
        let meta = this.state.categories.map(category => (
            <Meta key={metaNamePrefix(category.typeGroup.name.toLowerCase())}
                  options={this.state.meta.filter(meta => meta.category.typeGroup.id === category.typeGroup.id)}
                  onChange={this.onChangeLanguage}
                  isDisabled={this.isDisabled()}
                  className={classes('form-field').className}
                  category={category}
                  t={t}
                />
        ));
        return  (
            <React.Fragment>
                <SectionComponent title="Meta" className={classes('section').className} />
                {Boolean(meta.length) ? meta : <Loading message="loadingMessage.loadingMeta"/>}
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
                <SectionComponent title="Media" className={classes('section').className} />

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

        const {t} = this.props;

        return (
            <React.Fragment>
                {Boolean(fields.length === 0) && <p {...classes('message')}>{this.props.t('conceptForm.noMedia')}</p>}

                {fields.map((mediaName, index) => {
                    const media = fields.get(index);
                    return <Field
                        key={media.id}
                        name={mediaName}
                        classes={classes}
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
    apiService: PropTypes.instanceOf(ApiService).isRequired,

    // Optional
    error: PropTypes.string,
    isReadOnly: PropTypes.bool,
    submitting: PropTypes.bool,
    showTimestamps: PropTypes.bool,
    initialValues: PropTypes.object,
    status: PropTypes.array,
    meta: PropTypes.array,
    categories: PropTypes.array,
    isLanguageVariation: PropTypes.bool,
};

Concept.defaultProps = {
    isReadOnly: false,
    showTimestamps: false,
    status: [],
    meta: [],
    categories: [],
    isLanguageVariation: false
};

export default reduxForm({
    validate,
    form: CONCEPT_FORM_NAME,
    enableReinitialize: true,
})(Concept);