/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_FLASH_MESSAGE_CONCEPT_CREATE} from './createConceptActions';
import {emptyFlashMessage} from "../../../components/FlashMessage";

const initialState = {
    flashMessage: emptyFlashMessage
};

export const createConceptReducer = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_FLASH_MESSAGE_CONCEPT_CREATE:
            return {...state, flashMessage: action.payload};
        default:
            return state;
    }
};