import { ReactNode } from 'react';
import { legacy_createStore as createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import { render, RenderResult } from '@testing-library/react';
import { rootReducer } from '@/store/helpers/configureStore';
import { RootState } from '@/store';

type WithReduxConfig = {
  initialState?: RootState;
  store?: Store<RootState>;
};

export interface RenderWithRedux extends RenderResult {
  store: Store<RootState>;
}

export default function renderWithRedux(
  ui: ReactNode,
  { initialState, store = createStore(rootReducer, initialState) }: WithReduxConfig = {},
): RenderWithRedux {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}
