import React from 'react';
import classNames from 'classnames';

const AddList = (props) => (
    <li className={classNames({ 'active': props.isActive })}>
        <a href="#" onClick={(e) => { e.preventDefault(); props.onAdd() }}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true" />
        </a>
    </li>
);

export default AddList;