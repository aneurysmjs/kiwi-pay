import isEmpty from 'ramda/src/isEmpty';

import type { AppState } from '~/store/helpers/configureStore';

export const loadingSelector = (actions: string[]) => (state: AppState) => {
  // returns true only when all actions is not loading
  return actions.some((action) => state.api.loading[action]);
};

export const errorMessageSelector = (actions: string[]) => (state: AppState) => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  const [first] = actions.map((action) => state.api.error[action]).filter(isEmpty);

  return first || '';
};
