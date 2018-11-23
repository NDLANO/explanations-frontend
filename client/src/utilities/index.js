export const sortObjectsByKey = key => (a, b) => a[key].toLowerCase().localeCompare(b[key].toLowerCase());

export const capitalizeText = (text) => text.slice(0, 1).toUpperCase() + text.slice(1, text.length);

export const GetValuesFromObjectByKeyPrefix = (object, prefix) => {
    let objects = [];
    for (let property in object) {
        if (object.hasOwnProperty(property) && property.toString().startsWith(prefix)) {
            objects.push(object[property]);
        }
    }
    return objects;
};