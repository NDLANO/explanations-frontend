export const sortObjectsByKey = key => (a, b) => a[key].toLowerCase().localeCompare(b[key].toLowerCase());



export const createGetParam = (query, key, prop) => {
    if(!prop)
        return "";

    const param = `${key}=${prop}`;
    if (query)
        return `&${param}`;
    else
        return`?${param}`;

}

export const createMetaGetParam = (query, id) => {

    if (id === -1)
        return '';

    const param = `meta=${id}`;
    if (query)
        return `&${param}`;
    else
        return`?${param}`;

}


export const capitalizeText = (text) => text.slice(0, 1).toUpperCase() + text.slice(1, text.length);