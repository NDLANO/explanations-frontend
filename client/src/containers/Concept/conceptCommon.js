import {SEVERITY} from "../../components/FlashMessage";


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

    history.push(`/update/${id}`);
    return data;
};

export const submitErrorHandler = (err, {titleMessage, actionType}, updateFlashMessageFunction) => {
    const message = {};
    const {errors} = err.response.data;
    message['severity'] = SEVERITY.error;
    message['title'] = titleMessage;
    if (errors)
        message['message'] = errors['errorMessage'];
    updateFlashMessageFunction(actionType, message);

    return err;
};

export const mapStateToPropsCommon = ({cacheFromServer: {status, meta}}) => {

    return {
        meta: meta,
        status: status.map(x => ({value: x.id, label: x.name}))
    }
};