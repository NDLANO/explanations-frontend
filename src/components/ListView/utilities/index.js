/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export const trimTextToX = (text, x) => {
    if (!text)
        return '';

    if (text.length <= x)
        return text;

    return `${text.substr(text, x)}...`
};
