import React from 'react';
import Lists from '../../containers/lists';

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
            <Lists />
        </div>
    )
}
