/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "@ndla/button/es/Button";

import PreviewImage from "./PreviewMedia/PreviewImageComponent";
import PreviewNotSupported from "./PreviewMedia/PreviewNotSupported";
import PreviewVideo from "./PreviewMedia/PreviewVideo";
import MediaModal from "./MediaModal";
import PreviewAudio from "./PreviewMedia/PreviewAudio";

class Media extends React.Component {
    constructor(props) {
        super(props);

        this.deleteMedia = this.deleteMedia.bind(this);
        this.renderPreview = this.renderPreview.bind(this);
        this.renderPreviewButton = this.renderPreviewButton.bind(this);
    }

    deleteMedia() {
        const {disabled, deleteMedia, itemIndex} = this.props;
        if(!disabled)
            deleteMedia(itemIndex);
    }

    renderPreview(){
        const {media, t} = this.props;
        switch(media.mediaType.typeGroup.name.toLowerCase()) {
            case 'image':
                return <PreviewImage previewUrl={media.previewUrl} altText={media.altText}/>;
            case 'video':
                return <PreviewVideo previewUrl={media.previewUrl}/>;
            case 'audio':
                return <PreviewAudio previewUrl={media.previewUrl} audioType={media.audioType}/>;
            default:
                return <PreviewNotSupported t={t}/>
        }
    }
    renderPreviewButton() {
        return <Button outline>{this.props.t('phrases.preview')}</Button>
    }

    render(){
        if (!this.props.media)
            return null;
        const { classes, media: {mediaType}, t, disabled} = this.props;

        return (
            <div {...classes('form-field')}>
                <label>{mediaType.title}</label>
                <div {...classes('media-content')}>
                    <MediaModal t={t} triggerButton={this.renderPreviewButton}>
                        {this.renderPreview()}
                    </MediaModal>
                    <Button disabled={disabled} onClick={this.deleteMedia}>{this.props.t('phrases.delete')}</Button>
                </div>
            </div>
        )
    }
}

Media.propTypes = {
    // Required
    media: PropTypes.shape({
        mediaType: PropTypes.shape({
            title: PropTypes.string.isRequired
        }),
    }).isRequired,
    classes: PropTypes.func.isRequired,
    deleteMedia: PropTypes.func.isRequired,
    itemIndex: PropTypes.number.isRequired,


    // Optional
    disabled: PropTypes.bool
};
Media.defaultProps = {
    disabled: true,
    isReadOnly: true
};

export default Media;