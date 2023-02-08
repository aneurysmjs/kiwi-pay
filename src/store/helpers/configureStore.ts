import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middlewares from '@/store/middlewares';
import { usersReducer } from '@/store/modules/users/reducers';
import { apiReducer } from './reducers';

const rootReducer = combineReducers({
  users: usersReducer,
  api: apiReducer,
});

export default function configureStore() {
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

  return store;
}
