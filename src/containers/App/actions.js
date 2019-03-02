/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const UPDATE_STATUS = "UPDATE_STATUS";
export const UPDATE_METAS = "UPDATE_METAS";
export const UPDATE_MEDIA_TYPES = "UPDATE_MEDIA_TYPES";

export const loadMediaTypes = ({results: payload}) => ({type: UPDATE_MEDIA_TYPES, payload});
export const loadStatus = ({results: payload}) => ({type: UPDATE_STATUS, payload});

export const loadMeta = (({results: categories}, {results: metas}) => {
    let allMetas = [];
    categories.forEach(category => {
        const metaList = metas.filter(x => x.category.typeGroup.id === category.typeGroup.id);
        let defaultValue = null;
        if (metaList)
            defaultValue = metaList[0];

        allMetas.push({category, metaList, defaultValue});
    });
    return {type: UPDATE_METAS, payload: allMetas}
});