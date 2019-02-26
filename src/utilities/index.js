/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const capitalizeText = (text) => text.slice(0, 1).toUpperCase() + text.slice(1, text.length);

export const limitTextToLength = (text, length) => {
    if (text.length < length)
        return text;

    return `${text.slice(0, 220)}...`;
}

export const GetValuesFromObjectByKeyPrefix = (object, prefix) => {
    let objects = [];
    for (let property in object) {
        if (object.hasOwnProperty(property) && property.toString().startsWith(prefix)) {
            objects.push(object[property]);
        }
    }
    return objects;
};

// TODO sages
export const loadData = (apiService, loadStatus, loadMeta, loadMediaTypes, locale) => {
    const searchParams = new URLSearchParams();
    searchParams.append('language', locale);
    searchParams.append('pageSize', '100');
    searchParams.append('page', '1');
    const param = searchParams.toString();

    apiService.get(apiService.endpoints.status, param).then(data => loadStatus(data.results));
    apiService.get(apiService.endpoints.mediaType, param).then(data => loadMediaTypes(data));

    const promises = [
        apiService.get(apiService.endpoints.meta, param),
        apiService.get(apiService.endpoints.category, param),
    ];
    Promise.all(promises).then(([metas, categories]) => loadMeta(categories, metas));
};