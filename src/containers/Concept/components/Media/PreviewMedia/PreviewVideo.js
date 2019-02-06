import React from 'react';
import PropTypes from 'prop-types';
import PreviewNotSupported from "./PreviewNotSupported";

const PreviewVideo = ({type, title, previewUrl}) => {
    switch(type) {
        case 'youtube':
            return (
                <iframe
                        title={title}
                        src={previewUrl}//"https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen=""> </iframe>
            )
        case 'brightcove':
                   return (
                        <iframe
                            title={title}
                            src={previewUrl}//players.brightcove.net/4806596774001/BkLm8fT_default/index.html?videoId=5796749222001"
                            frameBorder="0"
                            allowFullScreen> </iframe>
                   )
        default:
            return <PreviewNotSupported/>
    }
};

PreviewVideo.propTypes = {
    previewUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    audioType: PropTypes.string.isRequired,
};

export default PreviewVideo;


