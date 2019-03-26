/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {string, func, object, bool, number, shape, oneOfType} from 'prop-types';
import PropTypes from "prop-types";

export const locationShape = {
    hash: string.isRequired,
    search: string.isRequired,
    pathname: string.isRequired,

    // Optional
    state: object,
};

export const historyProps = {
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
    location: PropTypes.shape(locationShape).isRequired,
};

export const matchProps = {
    url: string.isRequired,
    path: string.isRequired,
    isExact: bool.isRequired,

    // Optional
    params: object,
};

export const lastLocationShape = {
    pathname: PropTypes.string.isRequired
};


export const fieldInputProps = {
    name: string.isRequired,
    onBlur: func.isRequired,
    onChange: func.isRequired,
    onFocus: func.isRequired,
    value: oneOfType([
        string,
        number
    ]).isRequired,

    // Optional
    onDrop: func,
    onDragStart: func,
    checked: bool,
};

export const typeGroupProps = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
};

export const languageProps = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    abbreviation: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
};

export const statusProps = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    typeGroup: PropTypes.shape(typeGroupProps).isRequired,
    language: PropTypes.shape(languageProps).isRequired,
    languageVariation: PropTypes.string.isRequired,
};

export const categoryProps = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    canHaveMultiple: PropTypes.bool.isRequired,
    isRequired: PropTypes.bool.isRequired,
    updated: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    typeGroup: PropTypes.shape(typeGroupProps).isRequired,
    language: PropTypes.shape(languageProps).isRequired
};

export const metaProps = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    languageVariation: PropTypes.string.isRequired,
    category: PropTypes.shape(categoryProps).isRequired,
    updated: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    status: PropTypes.shape(statusProps).isRequired,
    abbreviation: PropTypes.string,
};

export const mediaTypeProps = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    typeGroup: PropTypes.shape(typeGroupProps).isRequired,
};


export const mediaProps = {
    id: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    externalId: PropTypes.string.isRequired,
    mediaType: PropTypes.shape(mediaTypeProps).isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
};


export const conceptProps = {
    title: PropTypes.string,
    category: PropTypes.shape(categoryProps),
    meta: PropTypes.arrayOf(PropTypes.shape(metaProps)),
    media: PropTypes.arrayOf(PropTypes.shape(mediaProps)),
    authorName: PropTypes.string,
    content: PropTypes.string,
    created: PropTypes.string,
    deletedBy: PropTypes.string,
    externalId: PropTypes.string,
    groupId: PropTypes.string,
    id: PropTypes.number,
    language: PropTypes.shape(languageProps),
    languageVariation: PropTypes.string,
    source: PropTypes.string,
    sourceAuthor: PropTypes.string,
    status: PropTypes.shape(statusProps),
    updated: PropTypes.string,
    urlToContent: PropTypes.string,
};

export const fieldInputShape = shape(fieldInputProps);