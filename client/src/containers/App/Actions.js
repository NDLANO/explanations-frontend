import * as Api from "../../api";

export const UPDATE_STATUS = "UPDATE_STATUS";
export const UPDATE_METAS = "UPDATE_METAS";




export const loadStatus = () => {
    return dispatch => {
        const request = Api.getAllStatus()
            .then(data => dispatch({type: UPDATE_STATUS, payload: data.data.data}));
    };
};


export const loadMeta = () => {
    return dispatch => {
        let allMetas = [];
        // TODO remove getAllCategories
        Promise.all([Api.getAllCategories(), Api.getAllMetas()])
            .then(([{data: {data: categories}}, {data: {data: metas}}]) => {
                categories.map(category => {
                    const metaList = metas.filter(x => x.category.id === category.id);
                    let defaultValue = null;
                    if (metaList)
                        defaultValue = metaList[0];

                    allMetas.push({category,metaList,defaultValue});
                });

                dispatch({type: UPDATE_METAS, payload: allMetas})
            });
    };
};
