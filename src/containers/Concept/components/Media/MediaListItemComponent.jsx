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



const MediaListItem = ({ classes, media: {title, mediaType}, deleteMedia, index, disabled}) =>
    <li>
        <label>{mediaType.title}</label>
        <div {...classes('content')}>
            <span>{title}</span>
            <span>
                <DeleteForever disabled={disabled} className="c-icon--large" onClick={() => {
                    if(!disabled)
                        deleteMedia(index);
                }} />
            </span>
        </div>
    </li>;

MediaListItem.propTypes = {
    // Required
    media: PropTypes.shape({
        mediaType: PropTypes.shape({
            title: PropTypes.string.isRequired
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