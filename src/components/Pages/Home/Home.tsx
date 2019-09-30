import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppState } from '~/store/helpers/configureStore';
import { PricingState } from '~/store/modules/pricing/types';
import PricingCard from '~/components/common/PricingCard';

interface PropsType {
  pricing: PricingState;
}

class Home extends Component<PropsType> {
  state = {
    isPricingOpened: false,
  };

  handlePricing = (): void => {
    const { isPricingOpened } = this.state;
    this.setState({
      isPricingOpened: !isPricingOpened,
    });
  };

  render(): JSX.Element {
    const {
      pricing: { pricingCards },
    } = this.props;
    const { isPricingOpened } = this.state;

    return (
      <div className="container">
        <h1 className="text-center mb-3">Kiwi Pay</h1>
        <button
          type="button"
          onClick={this.handlePricing}
          className="btn btn-lg btn-block btn-outline-primary"
        >
          Display Pricing Table
        </button>
        {isPricingOpened ? (
          <div className="card-deck my-4 text-center">
            {pricingCards && pricingCards.map(card => <PricingCard key={card.heading} {...card} />)}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): AppState => ({
  pricing: state.pricing,
});

export default connect(
  mapStateToProps,
  null,
)(Home);
