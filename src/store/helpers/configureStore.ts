import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { usersReducer } from '../modules/users/reducers';
import { gloversReducer } from '../modules/glovers/reducers';

import middlewares from '@/store/middlewares';
import { apiReducer } from './reducers';

const rootReducer = combineReducers({
  users: usersReducer,
  api: apiReducer,
  glovers: gloversReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(): Store<AppState> {
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

  return store;
}
