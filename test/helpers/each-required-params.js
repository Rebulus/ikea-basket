import _ from 'lodash';

/**
 * Apply for each parameters null value. It runs every possible combinations.
 * @param {string[]} listOfRequiredParams
 * @param {object} params
 * @param {Function} expectRunner
 */
export default function eachRequiredParams(listOfRequiredParams, params, expectRunner) {
    if (listOfRequiredParams.length) {
        var currentUnsetParams = _.reduce(params, function(result, value, key) {
            if (value === null) {
                result.push(key);
            }
            return result;
        }, []);
        currentUnsetParams = currentUnsetParams.length ? `"${currentUnsetParams.join('", "')}", ` : '';
        _.each(listOfRequiredParams, function(key) {
            it (`should be null, if params ${currentUnsetParams}"${key}" is not set`, function() {
                var cloneParams = _.clone(params);
                cloneParams[key] = null;
                expectRunner(cloneParams);
            });
        });
        params[listOfRequiredParams[0]] = null;
        eachRequiredParams(listOfRequiredParams.splice(1), params, expectRunner);
    }
};
