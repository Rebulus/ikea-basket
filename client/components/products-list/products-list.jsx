import React from 'react';
import _ from 'lodash';
import currencyDicts from '../../../helpers/dicts/currency';
import Product from '../../components/product';

const COUNT_PRODUCTS_IN_ROW = 4;
const MAX_PRODUCTS_IN_ROW = 12;

export const getProductsRows = (products) => {
    let rowId = 0;
    return _.reduce(products, (rows, product, index) => {
        let row;

        if (!index || index % COUNT_PRODUCTS_IN_ROW === 0) {
            row = {
                id: rowId,
                products: []
            };
            rowId++;
            rows.push(row);
        } else {
            row = _.last(rows);
        }

        row.products.push(product);

        return rows;
    }, []);
};

export const getFullPrice = (products) => {
    let fullPrice = _.reduce(products, function(result, product) {
        return result + product.base.price * product.additional.amount;
    }, 0);
    if (isNaN(fullPrice)) {
        fullPrice = 0;
    }

    return fullPrice;
};

const ProductsList = (props) => {
    const { products } = props;
    const productWidth = MAX_PRODUCTS_IN_ROW / COUNT_PRODUCTS_IN_ROW;

    // Calculate locale
    let locale;
    if (products.length) {
        locale = products[0].base.locale;
    }
    
    const fullPrice = getFullPrice(products);
    const productsRows = getProductsRows(products);

    return (
        <div className="products-list container-fluid">
            <div className="row">
                <div className="col-lg-1">
                    <a type="button" className="btn btn-default btn-sm" onClick={() => props.onRemoveAll()}>
                        <span className="glyphicon glyphicon-trash" aria-hidden="true" />&nbsp;Remove all
                    </a>
                </div>
                <h4 className="col-lg-1">Full price</h4>
                <h5 className="col-lg-2">
                    {fullPrice} {locale ? currencyDicts[locale] : ''}
                </h5>
            </div>
            <div className="products-list__body">
                {
                    _.map(productsRows, (row) => (
                        <div className="row" key={row.id}>
                            {
                                _.map(row.products, (product) => (
                                    <div className={`col-lg-${productWidth}`} key={product.base.id}>
                                        <Product {...product}
                                            onRemove={() => props.onRemoveProduct(product.base.id)}
                                            onChangeAmount={(amount) => props.onChangeProductAmount(product.base.id, amount)}/>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default ProductsList;
