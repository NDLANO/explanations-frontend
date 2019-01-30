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
import Modal, {ModalBody, ModalCloseButton, ModalHeader} from '@ndla/modal';

import NDLAApiService from "../../../../services/ndlaApiService";

const ImageSearchComponent = ({t, locale, onError, onSelect, triggerButton, api}) => {
    const translations = {
        searchPlaceholder: t('searchMedia.imageTitle'),
        searchButtonTitle: t('searchMedia.searchButtonTitle'),
        useImageTitle: t('searchMedia.use'),
        noResults: t('searchMedia.noResults'),
    };

    return (
        <Modal activateButton={triggerButton()} backgroundColor="white" size="large">
            {(onClose) => (
                <div>
                    <ModalHeader>
                        <ModalCloseButton title={t("confirmModal.default.button.close")} onClick={onClose} />
                    </ModalHeader>
                    <ModalBody>
                        <ImageSearch
                            {...translations}
                            locale={locale}
                            fetchImage={api.getById}
                            searchImages={api.getByQuery}
                            onImageSelect={onSelect}
                            onError={onError}
                        />
                    </ModalBody>
                </div>
            )}
        </Modal>
    );
};


ImageSearchComponent.propTypes = {
    t: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    triggerButton: PropTypes.func.isRequired,
    api: PropTypes.instanceOf(NDLAApiService).isRequired
};


export default injectT(ImageSearchComponent);