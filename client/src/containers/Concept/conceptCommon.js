/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {SEVERITY} from "../../components/FlashMessage";
import {updateRoute} from "../../utilities/routeHelper";


export const submitFormHandling = (submitFunction, successHandler, errorHandler, updateFlashMessage) => {
    return submitFunction
        .then(data => submitSuccessHandler(data, successHandler, updateFlashMessage))
        .catch(err => submitErrorHandler(err, errorHandler, updateFlashMessage));
};

export const submitSuccessHandler = (data, {titleMessage, actionType, history, id}, updateFlashMessageFunction) => {
    const message = {};
    message['severity'] = SEVERITY.success;
    message['title'] = titleMessage;
    updateFlashMessageFunction(actionType, message);
    history.push(updateRoute(id));
    return data;
};

export const submitErrorHandler = (errors, {titleMessage, actionType}, updateFlashMessageFunction) => {

    const message = {};
    message['severity'] = SEVERITY.error;
    message['title'] = titleMessage;
    if (errors && errors.errorMessage)
        message['message'] = errors.errorMessage;

    updateFlashMessageFunction(actionType, message);

    return errors;
};

export const mapStateToPropsCommon = ({cacheFromServer: {status, meta},  credentials: {accessToken}}) => {
    return {
        accessToken: accessToken,
        meta: meta,
        status: status.map(x => ({value: x.id, label: x.name})),
    }
};


export const metaExists = ({meta}) =>  meta.length > 0;
export const statusExists = ({status}) => status.length > 0;