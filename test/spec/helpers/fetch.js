import { expect } from 'chai';
import fetch from 'whatwg-fetch';
import { fetchRetry } from '../../../helpers/fetch';

describe('helpers/fetch', function() {

    describe('#fetchRetry', function() {

        beforeEach(function() {
            this.apiUrl = `some-url`;
            this.fetchMock.mock(this.apiUrl, fetch.Response.error());
        });

        it.only('should retry fetch 3 time, if the previous is error', function(done) {
            fetchRetry(this.apiUrl)
                .then(() => {
                    done();
                    console.log('test')
                }, () => {
                    done();
                    console.log(this.fetchMock.calls(this.apiUrl))
                })
        });

    });

});
