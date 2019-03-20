/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */



import {emptyFlashMessage} from "../../components/FlashMessage";
import {UPDATE_FLASH_MESSAGE_CONCEPT, UPDATE_INITIAL_FORM_VALUES_FOR_CONCEPT} from "./conceptActions";

const initialState = {
    flashMessage: emptyFlashMessage,
    initialFormValues: null,
};

export const cloneConceptReducer = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_FLASH_MESSAGE_CONCEPT:
            return {...state, flashMessage: action.payload};
        case UPDATE_INITIAL_FORM_VALUES_FOR_CONCEPT:
            return {...state, initialFormValues: action.payload};
        default:
            return state;
    }
};

export const conceptReducer = cloneConceptReducer;
