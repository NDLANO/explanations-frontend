/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';

const PreviewAudio = ({previewUrl, audioType}) => (
    <audio controls>
        <source src={previewUrl} type={audioType} />
    </audio>
);

PreviewAudio.propTypes = {
    previewUrl: PropTypes.string.isRequired,
    audioType: PropTypes.string.isRequired,
};

export default PreviewAudio;
