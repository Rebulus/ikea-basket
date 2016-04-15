/**
 * Get first element by a path.
 * Element of the path can be a object or array.
 * If a element is a array, then method take the first item from the array and go to the next element in the path.
 * @param {Object|Array} object
 * @param {string} path
 * @returns {*}
 */
export const getFirstProperty = (object, path) => {
    let properties = path.split('.');
    properties.forEach((property) => {
        if (Array.isArray(object)) {
            object = object[0];
        }
        object = object[property];
    });
    return Array.isArray(object) ? object[0] : object;
};

const s4 = () => (
    Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
);

export const guid = () => (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());

export default {
    getFirstProperty,
    guid
};
