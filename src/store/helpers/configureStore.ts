import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { pricingReducer } from '../modules/pricing/reducers';
import { usersReducer } from '../modules/users/reducers';
import { configReducer } from '../modules/config/reducers';
import { builderReducer } from '../modules/builder/reducers';
import { activeElementsReducer } from '../modules/activeElements/reducers';

const rootReducer = combineReducers({
  pricing: pricingReducer,
  users: usersReducer,
  config: configReducer,
  builder: builderReducer,
  activeElements: activeElementsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(): Store<AppState> {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

  return store;
}
