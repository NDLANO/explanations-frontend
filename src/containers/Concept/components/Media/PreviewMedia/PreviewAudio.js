import React from 'react';
import PropTypes from 'prop-types';
import {AudioPlayer} from "@ndla/ui";

const PreviewAudio = ({previewUrl, title, audioType}) => (
    <AudioPlayer src={previewUrl} title={title} type={audioType}/>
);

PreviewAudio.propTypes = {
    previewUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    audioType: PropTypes.string.isRequired,
};

export default PreviewAudio;