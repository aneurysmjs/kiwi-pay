import React, { Component } from 'react';
import { Pricing } from '~/store/modules/pricing/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PropsType extends Pricing {}

class PricingCard extends Component<PropsType> {
  render(): JSX.Element {
    const { heading, transactions, price, customerSupport, fee } = this.props;
    return (
      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">{heading}</h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title">
            ${price} <small className="text-muted">/ mo</small>
          </h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>{transactions} free transactions</li>
            <li>{fee}% Fee</li>
            <li>{customerSupport}</li>
          </ul>
          <button type="button" className="btn btn-lg btn-block btn-outline-primary">
            I want it
          </button>
        </div>
      </div>
    );
  }
}

export default PricingCard;
