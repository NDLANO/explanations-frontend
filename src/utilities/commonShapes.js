/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {string, func, object, bool, number, shape, any} from 'prop-types';
import PropTypes from "prop-types";

export const locationShape = shape({
    hash: string.isRequired,
    search: string.isRequired,
    pathname: string.isRequired,

    // Optional
    state: object,
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
    url: string.isRequired,
    path: string.isRequired,
    isExact: bool.isRequired,

    // Optional
    params: object,
});

export const lastLocationShape = shape({
    pathname: PropTypes.string.isRequired
});

export const fieldInputShape = shape({
    name: string.isRequired,
    onBlur: func.isRequired,
    onChange: func.isRequired,
    onDrop: func.isRequired,
    onDragStart: func.isRequired,
    onFocus: func.isRequired,
    value: any.isRequired,

    // Optional
    checked: bool,
});