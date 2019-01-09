/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {ModalCloseButton, ModalHeader, ModalBody, Modal} from "ndla-ui";

import PropTypes from 'prop-types';

import './style.css'

const ConfirmModal = ({title, content, onConfirm, t, triggerButton}) =>
    <Modal activateButton={triggerButton()}>
        {(onClose) => (
            <div>
                <ModalHeader>
                    <ModalCloseButton title={t("confirmModal.default.button.close")} onClick={onClose} />
                </ModalHeader>
                <ModalBody>
                    <h1>{t(title)}</h1>
                    <hr />
                    <p>{t(content)}</p>
                    <div className="u-horisontal-list">
                        <div>
                            <button className="c-button" onClick={() => {onConfirm(); onClose();}}>{t("confirmModal.default.button.confirm")}</button>
                            <div></div>
                        </div>
                        <button className="c-button c-button--outline" onClick={onClose}>{t("confirmModal.default.button.cancel")}</button>
                    </div>
                </ModalBody>
            </div>
        )}
    </Modal>;

ConfirmModal.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    triggerButton: PropTypes.func.isRequired,

    // Optional
    title: PropTypes.string,
    content: PropTypes.string,
};

ConfirmModal.defaultProps = {
    title: "confirmModal.default.title",
    content: "confirmModal.default.action",
};

export default ConfirmModal;