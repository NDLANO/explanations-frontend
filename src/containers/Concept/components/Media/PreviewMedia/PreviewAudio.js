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

<iframe className="c-video-preview__video" title="Was ist typisch deutsch?"
        src="//players.brightcove.net/4806596774001/BkLm8fT_default/index.html?videoId=5796749222001"
        allowFullScreen=""></iframe>