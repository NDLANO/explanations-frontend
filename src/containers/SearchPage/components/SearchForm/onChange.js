/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const normalizeFormValues = ({title: term, language, subject}) => {
    const query = {term: '', language: null, subject: null};
    if (term)
        query['term'] = term;
    if (language && language.value !== -1)
        query['language'] = {id: language.value, name: language.label};
    if (subject && subject.value !== -1)
        query['subject'] = {id: subject.value, name: subject.label};
    return query;
};


export const onChange = (values, dispatch, props, previousValues) =>  props.search(normalizeFormValues(values));