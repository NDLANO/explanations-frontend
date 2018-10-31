import React from 'react';
import {ModalCloseButton, ModalHeader, ModalBody, Modal} from "ndla-ui";
import {injectT} from "ndla-i18n";

import './style.css'

const ConfirmModal = ({title="confirmModal.title", content="confirmModal.action", onConfirm, t, triggerButton}) =>
    <Modal activateButton={triggerButton()}>
        {(onClose) => (
            <div>
                <ModalHeader>
                    <ModalCloseButton title={t("confirmModal.button.close")} onClick={onClose} />
                </ModalHeader>
                <ModalBody>
                    <h1>{t(title)}</h1>
                    <hr />
                    <p>{t(content)}</p>
                    <div className="u-horisontal-list">
                        <div>
                            <button className="c-button" onClick={() => {onConfirm(); onClose();}}>{t("confirmModal.button.confirm")}</button>
                            <div></div>
                        </div>
                        <button className="c-button c-button--outline" onClick={onClose}>{t("confirmModal.button.cancel")}</button>
                    </div>
                </ModalBody>
            </div>
        )}
    </Modal>;

export default injectT(ConfirmModal);