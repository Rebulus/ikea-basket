import { expect } from 'chai';
import { getProductParams } from '../../../helpers/url';

describe('helpers/url', function() {

    describe('#getProductParams', function() {

        [
            'https://www.ikea.com/ru/ru/catalog/products/S49123839/',
            'http://www.ikea.com/ru/ru/catalog/products/S49123839',
            'https://ikea.com/ru/ru/catalog/products/S49123839/',
            'http://ikea.com/ru/ru/catalog/products/S49123839/',
            'https://www.ikea.com/ru/ru/catalog/products/S49123839',
            'www.ikea.com/ru/ru/catalog/products/S49123839/',
            'ikea.com/ru/ru/catalog/products/S49123839'
        ].forEach(function(url) {
            it('should parse a ikea url formatted like ' + url, function() {
                const expectedResult = {
                    locale: 'ru',
                    lang: 'ru',
                    productNumber: 'S49123839'
                };
                expect(getProductParams(url)).to.be.deep.equal(expectedResult);
            });
        });

    });

});
