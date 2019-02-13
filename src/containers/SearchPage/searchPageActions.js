/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export const SEARCH_FOR_CONCEPT = 'SEARCH_FOR_CONCEPT';
export const updateSearchResult = payload => ({type: SEARCH_FOR_CONCEPT, payload});

export const UPDATE_INITIAL_FORM_VALUES = 'UPDATE_INITIAL_FORM_VALUES';
export const updateInitialFormValues = payload => ({type: UPDATE_INITIAL_FORM_VALUES, payload});