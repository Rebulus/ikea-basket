import React from 'react';

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

    handleChangeName() {
        this.props.onChangeName(this.props.id, this.refs.name.value);
    }

    handleCloseRename() {
        this.setState({
            isRename: false
        })
    }

    render() {
        var itemContent;
        if (this.state.isRename) {
            itemContent = (
                <a href="#">
                    <input ref="name" type="text" className="form-control input-sm" value={this.props.name}
                           onChange={() => this.handleChangeName()}
                           onKeyDown={(e) => (e.keyCode === 13 ? this.handleCloseRename() : null)}
                           onBlur={() => this.handleCloseRename()}/>
                </a>
            )
        } else {
            itemContent = (
                <a href="#"
                   onClick={() => this.handleSelect()}
                   onDoubleClick={() => this.handleRename()}>
                    {this.props.name}
                </a>
            )
        }
        return (
            <li className={this.props.isActive ? 'active' : ''}>
                {itemContent}
            </li>
        )
    }
}

export default ListTab;