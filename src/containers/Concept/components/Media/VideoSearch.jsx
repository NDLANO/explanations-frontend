/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import VideoSearch from "@ndla/video-search";

import VideoApi from "../../../../services/videoApiService";

const VideoSearchComponent = ({t, locale, onSelect, onError, api, enabledSources}) => {
    const translations = {
        loadMoreVideos: t('searchMedia.loadMore'),
        previewVideo: t('searchMedia.preview'),
        publishedDate: t('searchMedia.publishedDate'),
        duration: t('searchMedia.duration'),
        interactioncount: t('searchMedia.views'),
        searchPlaceholder: t('searchMedia.videoTitle'),
        searchButtonTitle: t('searchMedia.searchButtonTitle'),
        addVideo: t('searchMedia.use'),
        noResults: t('searchMedia.noResults'),
    };

    return (
            <VideoSearch
                translations={translations}
                locale={locale}
                searchVideos={api.searchVideos}
                onVideoSelect={onSelect}
                onError={onError}
                enabledSources={enabledSources}
            />
        );
};


VideoSearchComponent.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    api: PropTypes.instanceOf(VideoApi).isRequired,

    // Optional
    enabledSources: PropTypes.arrayOf(PropTypes.string)
};

VideoSearchComponent.defaultProps = {
    enabledSources: ['Brightcove', 'YouTube']
};


export default VideoSearchComponent;