import React from 'react';

class AddProductToList extends React.Component {
    handleAddProduct(event) {
        event.preventDefault();
        const value = this.refs.productUrl.value.trim();
        if (value) {
            this.props.onAdd(value);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="raw">
                    <div className="col-lg-5">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="input-group">
                                    <input ref="productUrl" className="form-control" type="text" defaultValue=""
                                        onKeyDown={(e) => (e.keyCode === 13 ? this.handleAddProduct(e) : null)}/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="button"
                                            onClick={(e) => this.handleAddProduct(e)}>
                                            Add
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProductToList;
