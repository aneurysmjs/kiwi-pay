import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { pricingReducer } from '../modules/pricing/reducers';
import { usersReducer } from '../modules/users/reducers';
import { configReducer } from '../modules/config/reducers';

const rootReducer = combineReducers({
  pricing: pricingReducer,
  users: usersReducer,
  config: configReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(): Store<AppState> {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

  return store;
}
