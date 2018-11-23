export const createSearchQueryFromValues = values => {
    const {title, ...rest} = values;

    let query = "?";
    if (title)
        query += `title=${title}&`;

    query += Object
        .values(rest)
        .filter(x => x.value > -1)
        .map(x => `meta=${x.value}&`)
        .join('');

    console.log("searchquery", query);
    return query;
};

let timeout = null;
export const onChange = (values, dispatch, props, previousValues) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => props.search(createSearchQueryFromValues(values)), 300);
};