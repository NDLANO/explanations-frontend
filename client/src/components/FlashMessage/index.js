import FlashMessage, {SEVERITY} from './FlashMessageComponent';
export default FlashMessage;

const emptyFlashMessage = {message: '', title: '', severity: ''};

export const updateFlashMessage = (type, message=emptyFlashMessage) => ({type: type, payload: message});

export {SEVERITY, emptyFlashMessage}

