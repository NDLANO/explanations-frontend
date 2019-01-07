/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const sortObjectsByKey = key => (a, b) => a[key].toLowerCase().localeCompare(b[key].toLowerCase());
export const sortWordsIgnoreCase = (a='', b='') => {
    let wordA = a.toLowerCase();
    let wordB = b.toLowerCase();
    if (wordA < wordB) {
        return -1;
    }
    if (wordA > wordB) {
        return 1;
    }

    return 0;
};