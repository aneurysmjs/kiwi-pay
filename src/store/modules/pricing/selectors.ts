import { pick, prop } from 'ramda';

import { AppState } from '~/store/helpers/configureStore';
import { PricingState } from '~/store/modules/pricing/types';
import { getConfigState } from '~/store/modules/config/selectors';

interface PricingSelectorState {
  pricingCards: PricingState['pricingCards'];
}

export const getPricingCards = pick(['pricingCards', 'bonuses']);

export const getPricing = prop('pricing');

export const getPricingState = (state: AppState): PricingSelectorState => ({
  ...getPricingCards(getPricing(state)),
  ...getConfigState(state),
});
