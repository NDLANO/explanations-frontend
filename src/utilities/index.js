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
};

export const GetValuesFromObjectByKeyPrefix = (object, prefix) => {
    let objects = [];
    for (let property in object) {
        if (object.hasOwnProperty(property) && property.toString().startsWith(prefix)) {
            objects.push(object[property]);
        }
    }
    return objects;
};
