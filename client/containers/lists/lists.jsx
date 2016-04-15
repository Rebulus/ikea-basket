import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getIdByUrl } from '../../../helpers/product';

// Actions
import { fetchProductIfNeeded } from '../../actions/products';
import { editListName, addProduct, changeAmount, removeProduct, removeAll } from '../../actions/list';
import { addList } from '../../actions/lists';

// Components
import { ListTab, AddList } from '../../components/lists';
import AddProductToList from '../../components/add-product';
import ProductsList from '../../components/products-list';

class Lists extends React.Component {
    state = {
        currentListId: undefined
    };

    handleSelect(listId) {
        this.setState({
            currentListId: listId
        })
    }

    handleChangeName(id, name) {
        this.props.editListName(id, name);
    }

    handleAddList() {
        this.props.addList();
    }
    
    handleAddProduct(value) {
        this.props.fetchProductIfNeeded(value);
        this.props.addProduct(this.state.currentListId, getIdByUrl(value));
    }

    render() {
        var content = null;
        if (this.state.currentListId) {
            const list = this.props.lists[this.state.currentListId];
            const products = _.map(list.products, (productAdditional) => (
                {
                    base: this.props.products[productAdditional.id],
                    additional: productAdditional
                }
            ));
            content = (
                <div className="lists-content">
                    <AddProductToList onAdd={(value) => this.handleAddProduct(value)}/>
                    <ProductsList products={products}
                        onRemoveAll={() => this.props.removeAll(list.id)}
                        onRemoveProduct={(productId) => this.props.removeProduct(list.id, productId)}
                        onChangeProductAmount={(productId, amount) => this.props.changeAmount(list.id, productId, amount)}/>
                </div>
            )
        }
        return (
            <div className="lists-wrapper">
                <ul className="nav nav-tabs">
                    {
                        _.map(this.props.lists, (list) => (
                            <ListTab {...list} isActive={this.state.currentListId === list.id} key={list.id}
                                onSelect={(id) => this.handleSelect(id)}
                                onChangeName={(id, name) => this.handleChangeName(id, name)}/>
                        ))
                    }
                    <AddList isActive={!Boolean(this.state.currentListId)} key="add-list"
                         onAdd={() => this.handleAddList()}/>
                </ul>
                {content}
            </div>
        )
    }
}

export default connect(
    state => state,
    {
        addList, editListName, fetchProductIfNeeded,
        addProduct, removeProduct, removeAll, changeAmount
    }
)(Lists);
