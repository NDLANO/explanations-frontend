/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { createTransform } from 'redux-persist';
import AuthenticationService from "../../services/authenticationService";
import {initialState} from "./loginReducer";

const credentialsTransform = createTransform(

    // transform state on its way to being serialized and persisted.
    (inboundState, key) => ({ ...inboundState}),

    // transform state being rehydrated
    (outboundState, key) => {
        const authService = new AuthenticationService({accessToken: outboundState.accessToken});
        if (authService.isTokenExpired(outboundState.accessToken)) {
            return {...initialState};
        }
        return { ...outboundState};
    },

    // define which reducers this transform gets called for.
    { whitelist: ['credentials'] }
);

export default credentialsTransform;