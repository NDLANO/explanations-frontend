/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE, UPDATE_INITIAL_FORM_VALUES} from './updateConceptActions';
import {emptyFlashMessage} from "../../../components/FlashMessage";

const initialState = {
    flashMessage: emptyFlashMessage,
    initialFormValues: null,
    deleteButtonIsDisabled: false
};

export const updateConceptReducer = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE:
            return {...state, flashMessage: action.payload};
        case UPDATE_INITIAL_FORM_VALUES:
            return {...state, initialFormValues: action.payload};
        default:
            return state;
    }
};