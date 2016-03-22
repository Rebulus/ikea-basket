import React from 'react';

export default ({locations = []}) => {
    const activeId = 0;
    return (
        <ul className="nav nav-tabs">
            {
                locations.map((location) => (
                    <li className={activeId === location.id ? 'active' : ''} key={location.id}>
                        <a href="#">{location.name}</a>
                    </li>
                ))
            }
        </ul>
    )
};
