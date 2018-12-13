/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const UPDATE_LOCALE = "UPDATE_LOCALE";

export const updateLocale = (locale) => ({
    type: UPDATE_LOCALE,
    payload: locale
});