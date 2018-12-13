export const UPDATE_STATUS = "UPDATE_STATUS";
export const UPDATE_METAS = "UPDATE_METAS";
export const UPDATE_CONCEPT_TITLES = "UPDATE_CONCEPT_TITLES";

export const loadStatus = payload => ({type: UPDATE_STATUS, payload});
export const loadConceptTitles = payload => ({type: UPDATE_CONCEPT_TITLES, payload});

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