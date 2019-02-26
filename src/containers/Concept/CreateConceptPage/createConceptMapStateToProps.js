/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {mapStateToPropsCommon} from '../conceptCommon';

export const mapStateToProps = state => {
    const {cacheFromServer: {meta}, concept: {create: {flashMessage}},locale} = state;

    const initialFormValues = {};
    const initialValueName = (name) => `meta_${name}`;
    meta.forEach(x => {
        let name = x.category.typeGroup.name.toLowerCase();
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
            if (!defaultLang && x.metaList[0])
                defaultLang = x.metaList[0];
            else
                defaultLang = {id: -1, name: ''};

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