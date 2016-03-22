import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Product from '../../components/product';

const COUNT_PRODUCTS_IN_ROW = 4;
const MAX_PRODUCTS_IN_ROW = 12;

const ProductsList = ({products} ) => {
    let rowId = 0;
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

    return (
        <div className="products-list">
            {
                rows.map((row) => (
                    <div className="row" key={row.id}>
                        {
                            row.products.map((product) =>(
                                <div className={`col-lg-${productWidth}`} key={product.id}>
                                    <Product {...product} />
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
};

export default connect(
    state => state
)(ProductsList);
