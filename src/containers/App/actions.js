/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const UPDATE_STATUS = "UPDATE_STATUS";
export const UPDATE_METAS = "UPDATE_METAS";

export const loadStatus = payload => ({type: UPDATE_STATUS, payload});

export const loadMeta = (categories, metas) => {
    let allMetas = [];
    categories.forEach(category => {
        const metaList = metas.filter(x => x.category.id === category.id);
        let defaultValue = null;
        if (metaList)
            defaultValue = metaList[0];

        allMetas.push({category, metaList, defaultValue});
    });
    return {type: UPDATE_METAS, payload: allMetas}
};