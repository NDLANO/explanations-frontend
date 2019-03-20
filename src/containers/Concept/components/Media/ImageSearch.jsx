/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import ImageSearch from '@ndla/image-search';

import ImageApi from "../../../../services/imageApiService";

const ImageSearchComponent = ({t, locale, onError, onSelect, api}) => {
    const translations = {
        searchPlaceholder: t('searchMedia.imageTitle'),
        searchButtonTitle: t('searchMedia.searchButtonTitle'),
        useImageTitle: t('searchMedia.use'),
        noResults: t('searchMedia.noResults'),
    };

    return (
            <ImageSearch
                {...translations}
                locale={locale}
                fetchImage={api.getById}
                searchImages={(api.getByQuery)}
                onImageSelect={onSelect}
                onError={onError}
            />
    );
};

ImageSearchComponent.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    api: PropTypes.instanceOf(ImageApi).isRequired
};


export default ImageSearchComponent;