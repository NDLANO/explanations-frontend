import FlashMessage from './FlashMessageComponent';

export {SEVERITY} from './FlashMessageComponent';
export const emptyFlashMessage = {message: '', title: '', severity: ''};
export const updateFlashMessage = (type, message) => ({type, payload: message});
export const clearFlashMessage = type => ({type, payload: emptyFlashMessage});


export default FlashMessage;

