/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const UPDATE_FLASH_MESSAGE_CONCEPT = 'UPDATE_FLASH_MESSAGE_CONCEP';
export const UPDATE_INITIAL_FORM_VALUES_FOR_CONCEPT = 'UPDATE_INITIAL_FORM_VALUES_FOR_CONCEPT';

export const updateInitialFormValues = values => ({type: UPDATE_INITIAL_FORM_VALUES_FOR_CONCEPT, payload: values});