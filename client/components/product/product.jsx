import React from 'react';
import _ from 'lodash';
import currencyDicts from '../../../helpers/dicts/currency';
import { getFirstProperty } from '../../../helpers/object';
import Amount from './amount.jsx';

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

export default (props) => {
    return (
        <div className="panel panel-default">
            {(() => {
                if (props.base.isFetching) {
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
                                        <a href={props.base.url} target="_blank">{props.base.name}</a>
                                    </h4>
                                    <h5 className="col-lg-5 text-right">{formatProductNumber(props.base.productNumber)}</h5>
                                    <div className="col-lg-2">
                                        <a type="button" className="btn btn-default btn-sm"
                                            onClick={() => props.onRemove()}>
                                            <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                                        </a>
                                    </div>
                                    <p className="col-lg-12">{props.base.facts}</p>
                                </div>
                            </div>
                            <a className="text-center" href={props.base.url} target="_blank">
                                <img src={props.base.imageUrl} alt={props.base.name} width="250" height="250" />
                            </a>
                            <div className="container-fluid">
                                <div className="row">
                                    <h5 className="col-lg-5">Price: <br /> {props.base.price * props.additional.amount} {currencyDicts[props.base.locale]}</h5>
                                    <div className="col-lg-7">
                                        <Amount amount={props.additional.amount} 
                                            onChange={(amount) => props.onChangeAmount(amount)} />
                                    </div>
                                </div>
                            </div>
                            <dl className="dl-horizontal">
                                <dt>Weight:</dt>
                                <dd>{calculateWeight(props.base.packages)}</dd>
                                <dt>Packages count:</dt>
                                <dd>{props.base.packages.length}</dd>
                            </dl>
                        </div>
                    )
                }
            })()}
        </div>
    )
}
