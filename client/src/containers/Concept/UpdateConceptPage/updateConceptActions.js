export const UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE = 'UPDATE_FLASH_MESSAGE_CONCEPT_CLONE';
export const UPDATE_INITIAL_FORM_VALUES = 'UPDATE_INITIAL_FORM_VALUES_FOR_CONCEPT_UPDATE';
export const SET_DELETE_BUTTON_AS_DISABLED = 'SET_DELETE_BUTTON_AS_DISABLED_FOR_CONCEPT_UPDATE';

export const updateInitialFormValues = values => ({type: UPDATE_INITIAL_FORM_VALUES, payload: values});
export const setDeleteButtonAsDisabled = (disabled=false) => ({type: SET_DELETE_BUTTON_AS_DISABLED, payload: disabled});