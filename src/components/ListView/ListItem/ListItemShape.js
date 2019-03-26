/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {string, array, number} from 'prop-types';


const listItemShape = {
    // Required
    id: number.isRequired,
    title: string.isRequired,

    // Optional
    tags: array,
    image: string,
    imageText: string,
    maxDescriptionLength: number
};

export {listItemShape};