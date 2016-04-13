import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { removeAll, removeProduct, changeAmount } from '../../actions';
import currencyDicts from '../../../helpers/dicts/currency';
import Product from '../../components/product';

const COUNT_PRODUCTS_IN_ROW = 4;
const MAX_PRODUCTS_IN_ROW = 12;

const ProductsList = (props) => {
    let rowId = 0;
    const { products } = props;
    const rows = _.reduce(_.keys(products), (rows, productId, index) => {
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

        row.products.push(products[productId]);

        return rows;
    }, []);

    const productWidth = MAX_PRODUCTS_IN_ROW / COUNT_PRODUCTS_IN_ROW;

    let locale;
    const productIds = _.keys(products);
    if (productIds.length) {
        locale = products[productIds[0]].locale;
    }
    
    let fullPrice = _.reduce(products, function(result, product) {
        return result + product.price * product.amount;
    }, 0);
    if (isNaN(fullPrice)) {
        fullPrice = 0;
    }

    return (
        <div className="products-list">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-1">
                        <a type="button" className="btn btn-default btn-sm" onClick={() => props.removeAll()}>
                            <span className="glyphicon glyphicon-trash" aria-hidden="true" />&nbsp;Remove all
                        </a>
                    </div>
                    <h4 className="col-lg-1">Full price</h4>
                    <h5 className="col-lg-2">
                        {fullPrice} {locale ? currencyDicts[locale] : ''}
                    </h5>
                </div>
            </div>
            <div className="products-list__body">
                {
                    rows.map((row) => (
                        <div className="row" key={row.id}>
                            {
                                row.products.map((product) => (
                                    <div className={`col-lg-${productWidth}`} key={product.id}>
                                        <Product {...product}
                                            onRemove={() => props.removeProduct(product.id)}
                                            onChangeAmount={(amount) => props.changeAmount(product.id, amount)}/>
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

export default connect(
    state => state,
    { removeAll, removeProduct, changeAmount }
)(ProductsList);
