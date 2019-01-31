/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectT } from '@ndla/i18n';
import VideoSearch from "@ndla/video-search";

import MediaModal from "./MediaModal";
import VideoApi from "../../../../services/videoApiService";

const VideoSearchComponent = ({t, locale, onSelect, onError, triggerButton, api, enabledSources}) => {
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
        <MediaModal t={t} triggerButton={triggerButton}>
            <VideoSearch
                translations={translations}
                locale={locale}
                searchVideos={api.searchVideos}
                onVideoSelect={onSelect}
                onError={onError}
                enabledSources={enabledSources}
            />
        </MediaModal>
        );
};


VideoSearchComponent.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    triggerButton: PropTypes.func.isRequired,
    api: PropTypes.instanceOf(VideoApi).isRequired,

    // Optional
    enabledSources: PropTypes.arrayOf(PropTypes.string)
};

VideoSearchComponent.defaultProps = {
    enabledSources: ['Brightcove', 'YouTube']
};


export default injectT(VideoSearchComponent);