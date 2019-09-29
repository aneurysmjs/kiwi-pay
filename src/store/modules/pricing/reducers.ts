import { PricingState, ADD_PRICING, PricingActionTypes } from './types';

const initialState: PricingState = {
  pricingCards: [
    {
      heading: 'Free',
      price: 0,
      users: 10,
      emailSupport: 'Email support',
      customerSupport: 'No customer support',
    },
  ],
};

export function pricingReducer(state = initialState, action: PricingActionTypes): PricingState {
  switch (action.type) {
    case ADD_PRICING:
      return {
        pricingCards: [...state.pricingCards, action.payload],
      };
    default:
      return state;
  }
}
