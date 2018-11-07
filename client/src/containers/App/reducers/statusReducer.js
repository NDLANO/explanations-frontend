/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { UPDATE_STATUS} from '../actions';

const initialState = {
    current: null,
    all: []
}

export const status = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_STATUS:
            return {
                ...state,
                all: action.payload,
                current: action.payload.find(x => x.name === "Active")
            };
        default:
            return state;
    }
};