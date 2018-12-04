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