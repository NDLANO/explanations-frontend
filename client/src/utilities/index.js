export const sortObjectsByKey = key => (a, b) => a[key].toLowerCase().localeCompare(b[key].toLowerCase());

export const capitalizeText = (text) => text.slice(0, 1).toUpperCase() + text.slice(1, text.length);