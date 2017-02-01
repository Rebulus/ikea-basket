import 'whatwg-fetch';
import _ from 'lodash';

export const fetchRetry = (url, options) => {
    options = {
        retries: 3,
        timeout: 1000,
        ...options
    };
    return new Promise(function(resolve, reject) {
        var wrappedFetch = function(retries) {
            fetch(url, options)
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    if (retries > 0) {
                        _.delay(function() {
                            wrappedFetch(--retries);
                        }, options.timeout);
                    } else {
                        reject(error);
                    }
                });
        };
        wrappedFetch(options.retries);
    });
};

export default {
    fetchRetry
}
