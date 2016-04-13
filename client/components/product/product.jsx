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
    return _.reduce(packages, function(result, packagesItem) {
        var weight = getFirstProperty(packagesItem, 'pkgInfo.weightMet').replace(',', '.').trim();
        return result + parseFloat(weight);
    }, 0);
};

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
                                    <h4 className="col-lg-6">
                                        <a href={props.url} target="_blank">{props.name}</a>
                                    </h4>
                                    <h5 className="col-lg-6 text-right">{formatProductNumber(props.productNumber)}</h5>
                                    <p className="col-lg-12">{props.facts}</p>
                                </div>
                            </div>
                            <a className="text-center" href={props.url} target="_blank">
                                <img src={props.imageUrl} alt={props.name} width="250" height="250" />
                            </a>
                            <h5>Price: {props.price} {currencyDicts[props.locale]}</h5>
                            <dl className="dl-horizontal">
                                <dt>Weight:</dt>
                                <dd>{calculateWeight(props.packages)}</dd>
                            </dl>
                        </div>
                    )
                }
            })()}
        </div>
    )
}
