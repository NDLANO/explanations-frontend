export const mapStateToProps = ({cacheFromServer: {status, meta}, locale}) => {
    let draft = status.find(x => x.name === "Draft") || status[0];
    if (draft) {
        draft = {value: draft.id, label: draft.name};
    } else {
        draft  = null;
    }

    const initialValues = {statusId: draft};
    const initialValueName = (name) => `meta_${name}`;
    meta.forEach(x => {
        let name = x.category.name.toLowerCase();

        let value = {
            value: x.defaultValue.id,
            label: x.defaultValue.name
        };
        if (name === "language") {
            let defaultLang = x.metaList.find(x => x.abbreviation === locale);
            if (!defaultLang)
                defaultLang = x.metaList[0];

            value = {
                value: defaultLang.id,
                label: defaultLang.name
            }
        }
        initialValues[initialValueName(name)] = value;
    });

    return {
        meta: meta,
        status: status.map(x => ({value: x.id, label: x.name})),
        initialValues
    }
};