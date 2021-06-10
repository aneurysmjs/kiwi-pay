import { AnyAction } from 'redux';
import { addPricing, updatePricing } from './actions';
import { PricingState } from './types';

const initialState: PricingState = {
  pricingCards: [
    {
      id: 0,
      heading: 'Free',
      price: 0,
      transactions: 5,
      fee: 1,
      customerSupport: 'No customer support',
    },
    {
      id: 1,
      heading: 'Advance',
      price: 100,
      transactions: 10,
      fee: 1,
      customerSupport: 'ticket support',
    },
    {
      id: 2,
      heading: 'Pro',
      price: 1000,
      transactions: 'unlimited',
      fee: 1,
      customerSupport: 'customer support 24/7',
    },
  ],
  bonuses: [
    {
      name: 'get 50% discount',
      code: '123',
      description: 'lorem ipsum',
    },
  ],
};

// eslint-disable-next-line import/prefer-default-export
export function pricingReducer(state = initialState, action: AnyAction): PricingState {
  if (addPricing.match(action)) {
    return {
      ...state,
      pricingCards: [...state.pricingCards, action.payload],
    };
  }

  if (updatePricing.match(action)) {
    const idx = state.pricingCards.findIndex(({ id }) => id === action.payload.id);
    return {
      ...state,
      pricingCards: [
        ...state.pricingCards.slice(0, idx),
        action.payload,
        ...state.pricingCards.slice(idx + 1),
      ],
    };
  }

  return state;
}
