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
import { injectT } from '@ndla/i18n';
import ImageApi from "../../../../services/ImageApiService";
import MediaModal from "./MediaModal";


const ImageSearchComponent = ({t, locale, onError, onSelect, triggerButton, api}) => {
    const translations = {
        searchPlaceholder: t('searchMedia.imageTitle'),
        searchButtonTitle: t('searchMedia.searchButtonTitle'),
        useImageTitle: t('searchMedia.use'),
        noResults: t('searchMedia.noResults'),
    };

    return (
        <MediaModal triggerButton={triggerButton} t={t}>
            <ImageSearch
                {...translations}
                locale={locale}
                fetchImage={api.getById}
                searchImages={(api.getByQuery)}
                onImageSelect={onSelect}
                onError={onError}
            />
        </MediaModal>
    );
};


ImageSearchComponent.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    triggerButton: PropTypes.func.isRequired,
    api: PropTypes.instanceOf(ImageApi).isRequired
};


export default injectT(ImageSearchComponent);