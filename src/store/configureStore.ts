import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { pricingReducer } from './modules/pricing/reducers';
import middlewares from './middlewares';

const rootReducer = combineReducers({
  pricing: pricingReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(): Store {
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

  return store;
}
