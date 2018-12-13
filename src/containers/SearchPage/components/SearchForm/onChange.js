/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'url-search-params-polyfill';

export const createSearchQueryFromValues = values => {
    const {title, ...metas} = values;

    const searchParams = new URLSearchParams();

    if (title)
        searchParams.append('title', title);

    Object.values(metas)
        .filter(x => x.value > -1)
        .forEach(x => searchParams.append('meta', x.value));

    return searchParams.toString();
};

let timeout = null;
export const onChange = (values, dispatch, props, previousValues) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => props.search(createSearchQueryFromValues(values)), 300);
};