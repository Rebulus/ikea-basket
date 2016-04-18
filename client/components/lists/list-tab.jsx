import React from 'react';
import classNames from 'classnames';

const RemoveButton = (props) => (
    <span className="glyphicon glyphicon-remove list__remove-list" aria-hidden="true"
          onClick={(e) => { e.stopPropagation(); props.onRemove(); }}/>
);

class ListTab extends React.Component {
    state = {
        isRename: false
    };

    componentDidUpdate(){
        if (this.state.isRename) {
            this.refs.name.focus();
        }
    }

    handleSelect() {
        this.props.onSelect(this.props.id);
    }

    handleRename() {
        this.setState({
            isRename: true
        })
    }

    handleCloseRename() {
        this.props.onChangeName(this.props.id, this.refs.name.value);
        this.setState({
            isRename: false
        })
    }

    handleRemove() {
        this.props.onRemove();
    }

    render() {
        var itemContent;
        if (this.state.isRename) {
            itemContent = (
                <a href="#">
                    <input ref="name" type="text" className="form-control input-sm" defaultValue={this.props.name}
                           onKeyDown={(e) => (e.keyCode === 13 ? this.handleCloseRename() : null)}
                           onBlur={() => this.handleCloseRename()}/>
                    <RemoveButton onRemove={() => this.handleRemove()}/>
                </a>
            )
        } else {
            itemContent = (
                <a href="#"
                   onClick={() => this.handleSelect()}
                   onDoubleClick={() => this.handleRename()}>
                    {this.props.name}
                    <RemoveButton onRemove={() => this.handleRemove()}/>
                </a>
            )
        }
        return (
            <li className={classNames('form-inline', { 'active': this.props.isActive })}>
                {itemContent}
            </li>
        )
    }
}

export default ListTab;