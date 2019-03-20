/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import AudioSearch from '@ndla/audio-search';

import AudioApi from "../../../../services/audioApiService";

const AudioSearchComponent = ({t, locale, onSelect, onError, api}) => {
    const defaultQueryObject = {
        query: '',
        page: 1,
        pageSize: 10,
        locale,
    };

    const translations = {
        searchPlaceholder: t('searchMedia.audioTitle'),
        searchButtonTitle: t('searchMedia.searchButtonTitle'),
        useAudio: t('searchMedia.use'),
        noResults: t('searchMedia.noResults'),
    };

    return (
            <AudioSearch
                translations={translations}
                locale={locale}
                fetchAudio={api.getById}
                searchAudios={api.getByQuery}
                onAudioSelect={onSelect}
                onError={onError}
                queryObject={defaultQueryObject}
            />
        );
};


AudioSearchComponent.propTypes = {
    t: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    api: PropTypes.instanceOf(AudioApi).isRequired
};


export default AudioSearchComponent;