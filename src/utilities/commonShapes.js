/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {string, func, object, bool, number, shape} from 'prop-types';
import PropTypes from "prop-types";

export const locationShape = shape({
    state: object,
    hash: string.isRequired,
    search: string.isRequired,
    pathname: string.isRequired,
});

export const historyShape = shape({
    go: func.isRequired,
    push: func.isRequired,
    block: func.isRequired,
    goBack: func.isRequired,
    listen: func.isRequired,
    replace: func.isRequired,
    length: number.isRequired,
    action: string.isRequired,
    goForward: func.isRequired,
    createHref: func.isRequired,
    location: locationShape.isRequired,
});

export const matchShape = shape({
    params: object,
    url: string.isRequired,
    path: string.isRequired,
    isExact: bool.isRequired,
});

export const lastLocationShape = shape({
    pathname: PropTypes.string.isRequired
});