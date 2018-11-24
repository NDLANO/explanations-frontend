/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_FLASH_MESSAGE_CONCEPT_CLONE, UPDATE_INITIAL_FORM_VALUES_FOR_CONCEPT_CLONE} from './cloneConceptActions';
import {emptyFlashMessage} from "../../../components/FlashMessage";

const initialState = {
    flashMessage: emptyFlashMessage,
    initialFormValues: null,
    deleteButtonIsDisabled: false
};

export const cloneConceptReducer = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_FLASH_MESSAGE_CONCEPT_CLONE:
            return {...state, flashMessage: action.payload};
        case UPDATE_INITIAL_FORM_VALUES_FOR_CONCEPT_CLONE:
            return {...state, initialFormValues: action.payload};
        default:
            return state;
    }
};