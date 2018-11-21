import React from 'react';
import {ModalCloseButton, ModalHeader, ModalBody, Modal} from "ndla-ui";

import './style.css'

const ConfirmModal = ({title="confirmModal.default.title", content="confirmModal.default.action", onConfirm, t, triggerButton}) =>
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

export default ConfirmModal;