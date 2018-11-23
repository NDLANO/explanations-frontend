export const UPDATE_FLASH_MESSAGE = 'UPDATE_FLASH_MESSAGE';

export const clearFlashMessage = () => {
    return {
        type: UPDATE_FLASH_MESSAGE,
        payload: {message: '', severity: '', title: ''}
    }
};

export const updateFlashMessage = (severity, title='', message='') => {
    return {
        type: UPDATE_FLASH_MESSAGE,
        payload: {message, severity, title}
    }
};