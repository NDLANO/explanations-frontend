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
import PreviewImage from "../PreviewMedia/PreviewImageComponent";
import PreviewNotSupported from "../PreviewMedia/PreviewNotSupported";

class MediaListItem extends React.Component {
    constructor(props) {
        super(props);

        this.deleteMedia = this.deleteMedia.bind(this);
    }

    deleteMedia() {
        const {disabled, deleteMedia, itemIndex} = this.props;
        if(!disabled)
            deleteMedia(itemIndex);
    }

    renderPreview(){
        const {classes, media, t} = this.props;

        let preview = <PreviewNotSupported t={t}/>;
        switch(media.mediaType.title.toLowerCase()) {
            case 'image':
                preview = <PreviewImage previewUrl={media.previewUrl} altText={media.altText}/>;
                break;
            case 'audio':
                break;
            case 'video':
                break;
            default:
                break;
        }
        return (
            <div {...classes('preview')}>
                {preview}
            </div>
        )
    }

    render(){
        const { classes, media: {title, mediaType}, isReadOnly, disabled} = this.props;

        return (
            <li {...classes('item')}>
                <div {...classes('content')}>
                    <label>{mediaType.title}</label>
                    <div {...classes('content', 'info')}>
                        <span>{title}</span>
                        <span>
                            {!isReadOnly &&
                                <DeleteForever disabled={disabled}
                                               className="c-icon--large"
                                               onClick={this.deleteMedia} />
                            }
                        </span>
                    </div>
                </div>
                
                {this.renderPreview()}
            </li>
        )
    }
}

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
    itemIndex: PropTypes.number.isRequired,


    // Optional
    disabled: PropTypes.bool,
    isReadOnly: PropTypes.bool
};
MediaListItem.defaultProps = {
    disabled: true,
    isReadOnly: true
};

export default MediaListItem;