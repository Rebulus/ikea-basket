import React from 'react';

const AddList = (props) => (
    <li className={props.isActive ? 'active' : ''}>
        <a href="#" onClick={() => props.onAdd()}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true" />
        </a>
    </li>
);

export default AddList;