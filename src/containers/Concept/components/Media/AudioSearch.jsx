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
import { injectT } from '@ndla/i18n';
import Modal, {ModalBody, ModalCloseButton, ModalHeader} from '@ndla/modal';

import NDLAApiService from "../../../../services/audioApiService";

const AudioSearchComponent = ({t, locale, onSelect, onError, baseApi, triggerButton}) => {
    const defaultQueryObject = {
        query: '',
        page: 1,
        pageSize: 10,
        locale,
    };

    const translations = {
        searchPlaceholder: t('audioSearch.searchPlaceholder'),
        searchButtonTitle: t('audioSearch.searchButtonTitle'),
        useAudio: t('audioSearch.useAudio'),
        noResults: t('audioSearch.noResults'),
    };

    const api = new NDLAApiService(`${baseApi}/audio-api/v1/audio`);

    return (
        <Modal activateButton={triggerButton()} backgroundColor="white" size="large">
            {(onClose) => (
                <div>
                    <ModalHeader>
                        <ModalCloseButton title={t("confirmModal.default.button.close")} onClick={onClose} />
                    </ModalHeader>
                    <ModalBody>
                        <AudioSearch
                            translations={translations}
                            locale={locale}
                            fetchAudio={api.getById}
                            searchAudios={api.getByQuery}
                            onAudioSelect={onSelect}
                            onError={onError}
                            queryObject={defaultQueryObject}
                        />
                    </ModalBody>
                </div>
            )}
        </Modal>
        );
};


AudioSearchComponent.propTypes = {
    t: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    baseApi: PropTypes.string.isRequired,
    triggerButton: PropTypes.func.isRequired
};


export default injectT(AudioSearchComponent);