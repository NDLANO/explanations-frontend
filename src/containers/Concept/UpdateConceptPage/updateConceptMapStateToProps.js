/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {formValueSelector} from "redux-form";
import {mapStateToPropsCommon} from '../conceptCommon';
import {CONCEPT_FORM_NAME} from "../components/Concept/ConceptComponent";

export const mapStateToProps = state => {
    const {initialFormValues, flashMessage} = state.concept.update;
    const {locale} = state;

    const selector = formValueSelector(CONCEPT_FORM_NAME);
    const statusLanguageVariation = selector(state, "statusId");
    let deleteButtonIsDisabled = false;
    if (statusLanguageVariation) {
        const currentStatus = state.cacheFromServer.status.find(x => x.languageVariation === statusLanguageVariation);
        if (currentStatus)
            deleteButtonIsDisabled = currentStatus.typeGroup.name.toLowerCase() === 'archived';
    }

    return {
        ...mapStateToPropsCommon(state),
        isAuthenticated: state.credentials.isAuthenticated,
        userScopes: state.credentials.scopes,
        initialFormValues,
        flashMessage,
        deleteButtonIsDisabled,
        locale
    }
};