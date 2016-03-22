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
    return object;
};

export default {
    getFirstProperty
};
