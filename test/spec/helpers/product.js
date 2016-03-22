import { expect } from 'chai';
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

    });

});
