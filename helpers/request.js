import vow from 'vow';
import request from 'request';
import xml2json from 'xml2json';
import { log } from './log';

export const send = (url) => (
    new vow.Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            // TODO - add corrent default error
            let errorAnswer = {
                error: 'Error'
            };

            //Check for error
            if(error) {
                reject(errorAnswer);
                log({
                    event: 'REQUEST',
                    type: 'all_error',
                    url: url,
                    error: errorAnswer,
                    originalError: error
                });
                return
            }

            //Check for right status code
            if(response.statusCode !== 200) {
                reject(errorAnswer);
                log({
                    event: 'REQUEST',
                    type: 'invalid_status_code',
                    url: url,
                    error: errorAnswer,
                    originalError: error
                });
                return;
            }

            var data = xml2json.toJson(body, {
                object: true,
                coerce: false
            });
            return resolve(data['ir:ikea-rest']);
        });
    }).catch((error) => {
        log({
            event: 'REQUEST',
            type: 'js_error',
            url: url,
            stackTrace: error.stack,
            originalError: error
        });
        return vow.reject({
            error: {
                id: 'js_error',
                message: 'Some wrong on the server'
            }
        })
    })
);

export default {
    send
}
