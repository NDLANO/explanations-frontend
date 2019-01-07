/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { createTransform } from 'redux-persist';
import {initialState} from "./loginReducer";
import {isTokenExpired} from "../../utilities/tokenHelper";

const credentialsTransform = createTransform(

    // transform state on its way to being serialized and persisted.
    (inboundState, key) => ({ ...inboundState}),

    // transform state being rehydrated
    (outboundState, key) => {

        if (isTokenExpired(outboundState.accessToken)) {
            return {...initialState, next: outboundState.next};
        }
        return { ...outboundState};
    },

    // define which reducers this transform gets called for.
    { whitelist: ['credentials'] }
);

export default credentialsTransform;