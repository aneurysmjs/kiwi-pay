// Describing the shape of the pricing's slice of state
export interface Pricing {
  id: number;
  heading: string;
  price: number;
  transactions: number | string;
  fee: number | string;
  customerSupport: string;
}

export interface Bonus {
  name: string;
  code: string;
  description: string;
}

export interface PricingState {
  pricingCards: Array<Pricing>;
  bonuses: Array<Bonus>;
}

/**
 * @desc here is were all actio types are located
 */
export const ADD_PRICING = 'ADD_PRICING';
export const UPDATE_PRICING = 'UPDATE_PRICING';
export const ADD_BONUS = 'ADD_BONUS';

interface AddPricingAction {
  type: typeof ADD_PRICING;
  payload: Pricing;
}

interface AsyncAction<S, P> {
  types: string[];
  shouldCallAPI: (state: S) => boolean;
  callAPI: () => Promise<Response>;
  payload: P;
}
