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
    if(query.length === 1)
        return '';

    return query;
};

let timeout = null;
export const onChange = (values, dispatch, props, previousValues) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => props.search(createSearchQueryFromValues(values)), 300);
};