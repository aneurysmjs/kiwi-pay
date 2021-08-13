/* eslint-disable no-restricted-syntax */
import {
  combineReducers,
  AnyAction,
  ReducersMapObject,
  Reducer,
  StateFromReducersMapObject,
  CombinedState,
} from 'redux';

export interface ReducerManager<IR extends ReducersMapObject> {
  getReducerMap: () => ReducersMapObject;
  add: (key: string, reducer: Reducer) => void;
  reduce: (
    state: StateFromReducersMapObject<IR>,
    action: AnyAction,
  ) => Reducer<CombinedState<StateFromReducersMapObject<IR>>>;
  remove: (key: string) => void;
}

// eslint-disable-next-line import/prefer-default-export
export function createReducerManager<IR extends ReducersMapObject>(
  initialReducers: IR,
): ReducerManager<IR> {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove = [];

  return {
    getReducerMap: (): ReducersMapObject => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (
      state: StateFromReducersMapObject<typeof reducers>,
      action: AnyAction,
    ): Reducer<CombinedState<StateFromReducersMapObject<IR>>> => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state };

        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action);
    },

    // Adds a new reducer with the specified key
    add: (key, reducer): void => {
      if (!key || reducers[key]) {
        return;
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer;

      console.log('reducers', reducers);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },

    // Removes a reducer with the specified key
    remove: (key: string): void => {
      if (!key || !reducers[key]) {
        return;
      }

      // Remove it from the reducer mapping
      delete reducers[key];

      // Add the key to the list of keys to clean up
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },
  };
}

/*
const staticReducers = {
  users: usersReducer,
  posts: postsReducer,
};

export function configureStore(initialState) {
  const reducerManager = createReducerManager(staticReducers);

  // Create a store with the root reducer function being the one exposed by the manager.
  const store = createStore(reducerManager.reduce, initialState);

  // Optional: Put the reducer manager on the store so it is easily accessible
  store.reducerManager = reducerManager;
}
*/
