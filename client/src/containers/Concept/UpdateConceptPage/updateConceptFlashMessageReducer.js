/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE} from './updateConceptActions';
import {emptyFlashMessage} from "../../../components/FlashMessage";

export const updateConcept = (state=emptyFlashMessage, action) => {
    switch(action.type) {
        case UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE:
            return action.payload;
        default:
            return state;
    }
};