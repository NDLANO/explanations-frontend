import { createTransform } from 'redux-persist';
import {AuthenticationService} from "../../services/authenticationService";
import {initialState} from "./loginReducer";

const credentialsTransform = createTransform(

    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        console.log("key", key, "intstate", inboundState)
        // convert mySet to an Array.
        return { ...inboundState};
    },

    // transform state being rehydrated
    (outboundState, key) => {
        const authService = new AuthenticationService();
        if (authService.isTokenExpired(outboundState.accessToken)) {
            return initialState;
        }
        return { ...outboundState};
    },

    // define which reducers this transform gets called for.
    { whitelist: ['credentials'] }
);

export default credentialsTransform;