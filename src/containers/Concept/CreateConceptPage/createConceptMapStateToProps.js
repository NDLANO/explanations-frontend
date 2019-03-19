/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import _ from 'lodash';
import {mapStateToPropsCommon} from '../conceptCommon';
import {metaNamePrefix} from "../components/Meta";

export const mapStateToProps = state => {
    const {cacheFromServer: {meta = [], status = []}, concept: {create: {flashMessage}},locale} = state;
    const metaWithUniqueCategories = _.uniqBy(meta, 'category.name') || [];
    const initialFormValues = {};

    const statusId = status.find(x => x.typeGroup.name.toLowerCase() === "draft");
    if (statusId)
        initialFormValues["statusId"] = statusId.languageVariation;



    metaWithUniqueCategories.filter(x => x.category.isRequired).forEach(m => {
        const name = m.category.typeGroup.name.toLowerCase();
        const metaName = metaNamePrefix(name);

        if (name === "language" && meta.find(x => x.abbreviation === locale)) {
            initialFormValues[metaName] = meta.find(x => x.abbreviation === locale).languageVariation;
        } else {
            if (m.category.canHaveMultiple) {
                initialFormValues[metaName] = [m.languageVariation];
            } else {
                initialFormValues[metaName] = m.languageVariation;
            }
        }
    });

    return {
        ...mapStateToPropsCommon(state),
        initialFormValues,
        flashMessage
    }
};