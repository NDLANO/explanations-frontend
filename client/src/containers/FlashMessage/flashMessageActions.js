export const UPDATE_FLASH_MESSAGE = 'UPDATE_FLASH_MESSAGE';

export const clearFlashMessage = () => {
    return {
        type: UPDATE_FLASH_MESSAGE,
        payload: {message: '', severity: '', title: ''}
    }
};

export const updateFlashMessage = (message, severity, title='') => {
    return {
        type: UPDATE_FLASH_MESSAGE,
        payload: {message, severity, title}
    }
};