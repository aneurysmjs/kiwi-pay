import { Pricing, ADD_PRICING, UPDATE_PRICING } from './types';
import { withMatcher } from '~/store/helpers/withMatcher';

export const addPricing = withMatcher((pricing: Pricing) => ({
  type: ADD_PRICING,
  payload: pricing,
}));

export const updatePricing = withMatcher((pricing: Pricing) => ({
  type: UPDATE_PRICING,
  payload: pricing,
}));
