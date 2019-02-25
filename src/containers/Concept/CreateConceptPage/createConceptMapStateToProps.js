/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {mapStateToPropsCommon} from '../conceptCommon';

export const mapStateToProps = state => {
    const {cacheFromServer: {status, meta}, concept: {create: {flashMessage}},locale} = state;
    /*let draft = status.find(x => x.name === "Draft") || status[0];
    if (draft) {
        draft = {value: draft.id, label: draft.name};
    } else {
        draft  = null;
    }*/
    let draft = status.find(x => x.name === "Draft") || status[0];
    if (draft) {
        draft = {value: draft.id, label: draft.name};
    } else {
        draft  = null;
    }

    const initialFormValues = {statusId: draft};
    const initialValueName = (name) => `meta_${name}`;
    meta.forEach(x => {
        let name = x.category.name.toLowerCase();
        const item = {};

        if (!x.defaultValue) {
            item['value'] = -1;
            item['label'] = '';
        }else {
            item['value'] = x.defaultValue.id;
            item['label'] = x.defaultValue.name;
        }

        if (name === "language") {
            let defaultLang = x.metaList.find(x => x.abbreviation === locale);
            if (!defaultLang)
                defaultLang = x.metaList[0];

            item['value'] = defaultLang.id;
            item['label'] = defaultLang.name;
        }
        initialFormValues[initialValueName(name)] = item;
    });

    return {
        ...mapStateToPropsCommon(state),
        initialFormValues,
        flashMessage
    }
};