import React from 'react';
import {ModalCloseButton, ModalHeader, ModalBody, Modal, Button} from "ndla-ui";
import {injectT} from "ndla-i18n";

import './ConfirmButton.style.css'

const ConfirmModal = ({title="confirm", content="contnt", onConfirm, t, triggerButton}) =>

    <Modal activateButton={triggerButton()}>
        {(onClose) => (
            <div>
                <ModalHeader>
                    <ModalCloseButton title={t("closeButton")} onClick={onClose} />
                </ModalHeader>
                <ModalBody>
                    <h1>{title}</h1>
                    <hr />
                    <p>{content}</p>
                    <span className="u-horizontal-list">
                        <button className="c-button" onClick={onConfirm}>{t("confirm")}</button>
                        <button className="c-button c-button--outline" onClick={onClose}>{t("cancel")}</button>
                    </span>
                </ModalBody>

            </div>
        )}
    </Modal>

export default injectT(ConfirmModal);