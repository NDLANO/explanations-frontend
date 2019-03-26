/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


import ImageApi from "../../services/imageApiService";

const getMetaByCategory = (list, name) => {
    return list.filter(x => x.category.typeGroup.name.toLowerCase() === name) || [];
};

export const mapStateToProps = state =>{
    const subjects = getMetaByCategory(state.cacheFromServer.meta, "subject");
    const languages = getMetaByCategory(state.cacheFromServer.meta, "language");

    return  ({
        locale: state.locale,
        searchResult: state.search.result,
        languages: languages,
        subjects: subjects,
        meta: state.cacheFromServer.meta,
        categories: state.cacheFromServer.categories,
        imageApi: new ImageApi(),
        isSearching: state.search.isSearching,
    })
};

