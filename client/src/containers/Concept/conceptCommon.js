import {SEVERITY} from "../../components/FlashMessage";
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE} from "./UpdateConceptPage";


export const submitHandling = (func, messagePrefix, updateFlashMessageFunc, updateId, errorMessageType, history) => {
    const message = {};

    return func
        .then(x => {
            message['severity'] = SEVERITY.success;
            message['title'] = t(`${messagePrefix}.submitMessage.success.title`);
            updateFlashMessageFunc(UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE, message);

            history.push(`/update/${updateId}`);
            return x;
        })
        .catch(err => {
            const {errors} = err.response.data;

            message['severity'] = SEVERITY.error;
            message['title'] = t(`${messagePrefix}.submitMessage.error.title`);
            if (errors)
                message['message'] = errors['errorMessage'];
            updateFlashMessageFunc(errorMessageType, message);

            return err;
        });
};
