import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middlewares from '@/store/middlewares';
import { usersReducer } from '@/store/modules/users/reducers';
import { cryptoReducer } from '@/store/modules/crypto/reducers';
import { employeesReducer } from '@/store/modules/employees/reducers';
import { apiReducer } from './reducers';

export const rootReducer = combineReducers({
  users: usersReducer,
  api: apiReducer,
  crypto: cryptoReducer,
  employees: employeesReducer,
});

export default function configureStore() {
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

  return store;
}
