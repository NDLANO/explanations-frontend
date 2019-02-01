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
import Modal, {ModalBody, ModalCloseButton, ModalHeader} from '@ndla/modal';

const MediaModal = ({children, triggerButton, t}) =>
    <Modal activateButton={triggerButton()} backgroundColor="white" size="large">
        {(onClose) => (
            <div>
                <ModalHeader>
                    <ModalCloseButton title={t("confirmModal.default.button.close")} onClick={onClose} />
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </div>
        )}

    </Modal>;

MediaModal.propTypes = {
    t: PropTypes.func.isRequired,
    triggerButton: PropTypes.func.isRequired
};


export default injectT(MediaModal);