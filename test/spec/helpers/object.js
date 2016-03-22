import { expect } from 'chai';
import { getFirstProperty } from '../../../helpers/object';

describe('helpers/object', function() {

    describe('#getFirstProperty', function() {
        
        it('should select property value from path', function() {
            const object = {
                'prop1': {
                    'prop2': 'value'
                }
            };

            expect(getFirstProperty(object, 'prop1.prop2')).to.equal('value');
        });
        
        [
            {
                object: {
                    'prop1': [
                        {
                            'prop2': 'value1'
                        },
                        {
                            'prop2': 'value2'
                        }
                    ]
                },
                path: 'prop1.prop2'
            },
            {
                object: [
                    {
                        prop1: {
                            prop2: 'value1'
                        }
                    },
                    {
                        prop1: {
                            prop2: 'value2'
                        }
                    }
                ],
                path: 'prop1.prop2'
            },
            {
                object: [
                    {
                        prop1: [
                            {
                                'prop2': 'value1'
                            },
                            {
                                'prop2': 'value2'
                            }
                        ]
                    },
                    {
                        prop1: [
                            {
                                'prop2': 'value3'
                            },
                            {
                                'prop2': 'value4'
                            }
                        ]
                    }
                ],
                path: 'prop1.prop2'
            }
        ].forEach(function(assetItem) {
            it(`should select the first property from path ${JSON.stringify(assetItem)}, if some item is array`, function() {
                expect(getFirstProperty(assetItem.object, assetItem.path)).to.equal('value1');
            });
        });
    });

});
