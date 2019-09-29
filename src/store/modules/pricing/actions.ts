import { Action } from '~/shared/types';
import { Pricing, ADD_PRICING } from './types';

export function addPricing(pricing: Pricing): Action<Pricing> {
  return {
    type: ADD_PRICING,
    payload: pricing,
  };
}
