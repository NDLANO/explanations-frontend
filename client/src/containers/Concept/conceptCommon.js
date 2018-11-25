import {SEVERITY} from "../../components/FlashMessage";
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE} from "./UpdateConceptPage";


export const submitFormHandling = (submitFunction, titleMessages, errorMessageType, props) => {
    const {updateFlashMessage, history, initialFormValues: {id}} = props;

    return submitFunction
        .then(x => {
            const message = {};
            message['severity'] = SEVERITY.success;
            message['title'] = titleMessages.success;
            updateFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE, message);

            history.push(`/update/${id}`);
            return x;
        })
        .catch(err => submitErrorHandler(err, titleMessages.error, updateFlashMessage, errorMessageType));
};

export const submitErrorHandler = (err, titleMessage, updateFlashMessageFunction, actionType) => {
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