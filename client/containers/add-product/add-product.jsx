import React from 'react';
import { connect } from 'react-redux';
import { fetchProductIfNeeded } from '../../actions';

const AddProduct = React.createClass({
    displayName: 'AddProduct',

    handleClick(event) {
        event.preventDefault();
        const value = this.refs.productUrl.value.trim();
        if (value) {
            this.props.fetchProductIfNeeded(value);
        }
    },

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <input ref="productUrl" className="form-control" type="text" defaultValue="" />
                    <button className="btn btn-default" onClick={this.handleClick}>Add</button>
                </div>
            </div>
        )
    }
});

export default connect(
    null,
    { fetchProductIfNeeded }
)(AddProduct);
