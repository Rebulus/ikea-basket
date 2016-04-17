import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getIdByUrl } from '../../../helpers/product';

// Actions
import { fetchProductIfNeeded } from '../../actions/products';
import { editListName, addProduct, changeAmount, removeProduct, removeAll } from '../../actions/list';
import { addList, selectList, removeList } from '../../actions/lists';

// Components
import { ListTab, AddList } from '../../components/lists';
import AddProductToList from '../../components/add-product';
import ProductsList from '../../components/products-list';

class Lists extends React.Component {
    handleSelect(listId) {
        this.props.selectList(listId);
    }

    handleChangeName(id, name) {
        this.props.editListName(id, name);
    }

    handleAddList() {
        this.props.addList();
    }

    handleRemoveList(listId) {
        this.props.removeList(listId);
    }
    
    handleAddProduct(value) {
        this.props.fetchProductIfNeeded(value);
        this.props.addProduct(this.props.lists.current, getIdByUrl(value));
    }

    render() {
        let content = null;
        const items = this.props.lists.items;
        const currentListId = this.props.lists.current;
        if (currentListId) {
            const list = items[currentListId];
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
                        _.map(items, (list) => (
                            <ListTab {...list} isActive={currentListId === list.id} key={list.id}
                                onSelect={(id) => this.handleSelect(id)}
                                onChangeName={(id, name) => this.handleChangeName(id, name)}
                                onRemove={() => this.handleRemoveList(list.id)}/>
                        ))
                    }
                    <AddList isActive={!Boolean(currentListId)} key="add-list"
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
        addList, selectList, removeList,
        editListName, fetchProductIfNeeded,
        addProduct, removeProduct, removeAll, changeAmount
    }
)(Lists);
