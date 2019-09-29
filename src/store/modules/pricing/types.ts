// Describing the shape of the pricing's slice of state
export interface Pricing {
  heading: string;
  price: number;
  transactions: number | string;
  fee: number | string;
  customerSupport: string;
}

export interface PricingState {
  pricingCards: Array<Pricing>;
}

/**
 * @desc here is were all actio types are located
 */
export const ADD_PRICING = 'ADD_PRICING';

interface AddPricingAction {
  type: typeof ADD_PRICING;
  payload: Pricing;
}

export type PricingActionTypes = AddPricingAction;
