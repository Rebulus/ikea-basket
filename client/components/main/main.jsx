import React from 'react';
import Navigation from '../navigation';
import AddProduct from '../../containers/add-product';
import ProductsList from '../../containers/products-list';

export default () => {
    const locations = [
        {
            id: 0,
            name: 'Russia'
        },
        {
            id: 1,
            name: 'Lietuva'
        }
    ];
    
    return (
        <div className="ikea-basket">
            <Navigation locations={locations}/>
            <AddProduct />
            <div className="container-fluid">
                <ProductsList />
            </div>
        </div>
    )
}
