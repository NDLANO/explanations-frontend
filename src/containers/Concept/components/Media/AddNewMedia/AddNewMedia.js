/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import Button from '@ndla/button';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { Quote, Camera, SquareVideo } from '@ndla/icons/editor';
import Modal, {ModalBody, ModalCloseButton, ModalHeader} from "@ndla/modal";

import VideoSearch from "../VideoSearch";
import AudioSearch from "../AudioSearch";
import ImageSearch from "../ImageSearch";

import VideoApi from "../../../../../services/videoApiService";
import AudioApi from "../../../../../services/audioApiService";
import ImageApi from "../../../../../services/imageApiService";

import {config} from "../../../../../config";

const classes = new BEMHelper({
    name: 'add-new-media-list',
    prefix: 'c-',
});

class AddNewMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaType: '',
        };

        this.showVideo = this.showMedia.bind(this, "video");
        this.showAudio = this.showMedia.bind(this, "audio");
        this.showImage = this.showMedia.bind(this, "image");
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onClose = this.onClose.bind(this);

        this.mediaTypes = [
            {
                onClick: this.showVideo,
                text: this.props.t('phrases.video'),
                icon: <SquareVideo className="c-icon--large" />
            },
            {
                onClick: this.showImage,
                text: this.props.t('phrases.image'),
                icon: <Camera className="c-icon--large" />
            },
            {
                onClick: this.showAudio,
                text: this.props.t('phrases.audio'),
                icon: <Quote className="c-icon--large" />
            }
        ];


        window.addEventListener('keyup', this.onKeyPressed, true);
    }


    onSelect(media) {
        const mediaType = this.props.mediaTypes.find(x => x.typeGroup.name.toLowerCase() === this.state.mediaType.toLowerCase()); // concert this.state.mediaType with this props.t(this.state.mediaType)
        const serializedMedia = {
            mediaTypeId: mediaType.id,
            mediaType,
            source: 'ndla'
        };

        new Promise((resolve, reject) => {
            switch(mediaType.typeGroup.name.toLowerCase()) {
                case 'video':
                    if (media.displayLink === 'www.youtube.com') {
                        const youTubeId = media.pagemap.videoobject[0].videoid;
                        resolve({
                            previewUrl: this.props.videoApiService.getById(youTubeId, config.VIDEO_SOURCES.youtube),
                            externalId: youTubeId,
                            title: media.title,
                            source: config.VIDEO_SOURCES.youtube,
                        });
                    }
                    else if (media.account_id === config.BRIGHTCOVE.accountId) {
                        resolve({
                            previewUrl: this.props.videoApiService.getById(media.id, config.VIDEO_SOURCES.brightcove),
                            externalId: media.id,
                            title: media.name,
                            source: config.VIDEO_SOURCES.brightcove,
                        })
                    }
                    break;
                case 'image':
                    resolve({
                        previewUrl: media.imageUrl,
                        externalId: media.id,
                        title: media.title.title,
                        altText: media.alttext.alttext,
                    });
                    break;
                case 'audio':
                    this.props.audioApiService.getById(media.id)
                        .then(({audioFile}) => {
                            resolve({
                                previewUrl: audioFile.url,
                                audioType: audioFile.mimeType,
                                externalId: media.id,
                                title: media.title.title,
                            });
                    });
                    break;
                default:
                    reject();
                    break;
            }
        })
            .then(x => this.props.onSelectMedia({...serializedMedia, ...x}))
            .catch(x => this.props.onSelectMedia(null))
            .finally(() => this.setState({mediaType: ''}));
    }

    onError(error) {

    }

    showMedia(mediaType) {
        this.setState({mediaType})
    }

    renderContent() {
        const {locale, t, videoApiService, audioApiService, imageApiService} = this.props;
        const mediaProps = {
            t: t,
            locale: locale,
            onError: this.onError,
            onSelect: this.onSelect
        };
        switch(this.state.mediaType) {
            case t('phrases.video').toLowerCase():
                return <VideoSearch {...mediaProps} api={videoApiService}/>;
            case t('phrases.audio').toLowerCase():
                return <AudioSearch {...mediaProps} api={audioApiService}/>;
            case t('phrases.image').toLowerCase():
                return <ImageSearch {...mediaProps} api={imageApiService}/>;
            default:
                return <ul {...classes()}>
                    {this.mediaTypes.map(x =>
                        <li key={x.text}>
                            <Button onClick={x.onClick} {...classes('item')}>
                                {x.icon}
                                {x.text}
                            </Button>
                        </li>
                    )}
                </ul>
        }
    }

    onClose(){
        this.setState({mediaType: ''});
        this.props.close();
    };

    onKeyPressed(e) {
        if (e.key === 'Escape' && this.props.isOpen) {
            this.props.close();
        }
    }

    render() {
        const {t} = this.props;
        return (
            <Modal
                size="large"
                onClose={this.onClose}
                backgroundColor="white"
                controllable
                isOpen={this.props.isOpen}
            >
                {(onClose) => (
                    <div>
                        <ModalHeader>
                            <ModalCloseButton title={t("confirmModal.default.button.close")} onClick={this.onClose} />
                        </ModalHeader>
                        <ModalBody>
                            {this.renderContent()}
                        </ModalBody>
                    </div>
                )}

            </Modal>
        )
    }
}

AddNewMedia.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    onSelectMedia: PropTypes.func.isRequired,
    mediaTypes: PropTypes.array.isRequired,

    // Optional
    videoApiService: PropTypes.instanceOf(VideoApi),
    audioApiService: PropTypes.instanceOf(AudioApi),
    imageApiService: PropTypes.instanceOf(ImageApi),
    isOpen: PropTypes.bool
};

AddNewMedia.defaultProps = {
    videoApiService: new VideoApi(),
    audioApiService: new AudioApi(),
    imageApiService: new ImageApi(),
    isOpen: false
};

export default AddNewMedia;