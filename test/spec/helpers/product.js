import { expect } from 'chai';
import eachRequiredParams from '../../helpers/each-required-params';
import { getId } from '../../../helpers/product';

describe('helpers/product', function() {

    describe('#getId', function() {

        it('should create a string id by product\'s parameters', function() {
            const productParams = {
                locale: 'ru',
                lang: 'ru',
                productNumber: 'S09836'
            };
            expect(getId(productParams)).to.equal('ru-ru-S09836')
        });

        let listOfRequiredParams = ['locale', 'lang', 'productNumber'];
        let startProductParams = {
            locale: 'ru',
            lang: 'ru',
            productNumber: 'S09836'
        };

        eachRequiredParams(listOfRequiredParams, startProductParams, function(productParams) {
            expect(getId(productParams)).to.equal(null);
        });

    });

});
