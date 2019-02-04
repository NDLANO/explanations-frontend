/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { DeleteForever } from '@ndla/icons/editor/';



const MediaListItem = ({ classes, media: {title, mediaType, previewUrl}, deleteMedia, index, disabled}) =>
    <li>
        <label>{mediaType.name}</label>
        <div {...classes('content')}>
            <span>{title}</span>
            <span>
                <DeleteForever disabled={disabled} className="c-icon--large" onClick={() => deleteMedia(index)} />
            </span>
        </div>
    </li>;

MediaListItem.propTypes = {
    // Required
    media: PropTypes.shape({
        mediaType: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        title: PropTypes.string.isRequired,
    }).isRequired,
    classes: PropTypes.func.isRequired,
    deleteMedia: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,

    // Optional
    disabled: PropTypes.bool
};

export default MediaListItem;