import React from 'react';

class Amount extends React.Component {
    handleDecrease() {
        let amount = this.props.amount;
        this.props.onChange(Math.max(--amount, 1));
    }

    handleIncrease() {
        let amount = this.props.amount;
        this.props.onChange(++amount, 0);
    }

    handleChange() {
        var amount = parseInt(this.refs.amount.value, 10);
        if (isNaN(amount) || amount < 1) {
            this.props.onChange(1);
        } else {
            this.props.onChange(amount);
        }
    }

    getValue() {
        if (document.activeElement === this.refs.amount) {
            return this.refs.amount.value;
        } else {
            return this.props.amount;
        }
    }

    render() {
        return (
            <div className="input-group input-sm">
            <span className="input-group-btn">
                <button className="btn btn-secondary" type="button"
                        onClick={() => this.handleDecrease()}>-</button>
            </span>
                <input ref="amount" type="text" className="form-control text-center" value={this.getValue()}
                       onChange={() => this.handleChange()}
                       onBlur={() => this.handleChange()}
                />
            <span className="input-group-btn">
                <button className="btn btn-secondary" type="button"
                        onClick={() => this.handleIncrease()}>+</button>
            </span>
            </div>
        );
    }
}

export default Amount;