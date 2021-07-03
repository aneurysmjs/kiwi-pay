import { useState, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { getPricingState } from '~/store/modules/pricing/selectors';
import PricingCard from '~/components/common/PricingCard';

const defaultState = {
  isPricingOpened: false,
};

const Home: FunctionComponent = () => {
  const app = useSelector(getPricingState);

  const { pricingCards } = app;
  const [state, setState] = useState(defaultState);

  const { isPricingOpened } = state;

  const handlePricing = (): void => {
    setState({
      ...state,
      isPricingOpened: !isPricingOpened,
    });
  };

  return (
    <div className="container">
      <h1 className="text-center mb-3">Kiwi Pay</h1>
      <button
        type="button"
        onClick={handlePricing}
        className="btn btn-lg btn-block btn-outline-primary"
      >
        Display Pricing Table
      </button>
      {isPricingOpened ? (
        <div className="card-deck my-4 text-center">
          {pricingCards && pricingCards.map((card) => <PricingCard key={card.heading} {...card} />)}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
