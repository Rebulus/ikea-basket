import React from 'react';
import _ from 'lodash';
import currencyDicts from '../../../helpers/dicts/currency';
import { getFirstProperty } from '../../../helpers/object';

export const formatProductNumber = (productNumber) => {
    return productNumber
        .replace(/^\D/, '')
        .match(/\d{1,3}/g)
        .join('.');
};

export const calculateWeight = (packages) => {
    var result = _.reduce(packages, function(result, packagesItem) {
        var weight = getFirstProperty(packagesItem, 'pkgInfo.weightMet').replace(',', '.').trim();
        return result + parseFloat(weight);
    }, 0);

    return result.toFixed(2);
};

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

export default (props) => {
    return (
        <div className="panel panel-default">
            {(() => {
                if (props.isFetching) {
                    return (
                        <div className="panel-body">
                            Loading...
                        </div>
                    );
                } else {
                    return (
                        <div className="panel-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <h4 className="col-lg-5">
                                        <a href={props.url} target="_blank">{props.name}</a>
                                    </h4>
                                    <h5 className="col-lg-5 text-right">{formatProductNumber(props.productNumber)}</h5>
                                    <div className="col-lg-2">
                                        <a type="button" className="btn btn-default btn-sm"
                                            onClick={() => props.onRemove()}>
                                            <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                                        </a>
                                    </div>
                                    <p className="col-lg-12">{props.facts}</p>
                                </div>
                            </div>
                            <a className="text-center" href={props.url} target="_blank">
                                <img src={props.imageUrl} alt={props.name} width="250" height="250" />
                            </a>
                            <div className="container-fluid">
                                <div className="row">
                                    <h5 className="col-lg-5">Price: <br /> {props.price * props.amount} {currencyDicts[props.locale]}</h5>
                                    <div className="col-lg-7">
                                        <Amount amount={props.amount} 
                                            onChange={(amount) => props.onChangeAmount(amount)} />
                                    </div>
                                </div>
                            </div>
                            <dl className="dl-horizontal">
                                <dt>Weight:</dt>
                                <dd>{calculateWeight(props.packages)}</dd>
                                <dt>Packages count:</dt>
                                <dd>{props.packages.length}</dd>
                            </dl>
                        </div>
                    )
                }
            })()}
        </div>
    )
}
