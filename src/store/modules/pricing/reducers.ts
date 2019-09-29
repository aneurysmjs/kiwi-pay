import { PricingState, ADD_PRICING, PricingActionTypes } from './types';

const initialState: PricingState = {
  pricingCards: [
    {
      heading: 'Free',
      price: 0,
      transactions: 5,
      fee: 1,
      customerSupport: 'No customer support',
    },
    {
      heading: 'Advance',
      price: 100,
      transactions: 10,
      fee: 1,
      customerSupport: 'ticket support',
    },
    {
      heading: 'Pro',
      price: 1000,
      transactions: 'unlimited',
      fee: 1,
      customerSupport: 'customer support 24/7',
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
