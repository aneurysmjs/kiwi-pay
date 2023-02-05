export { default } from './makeGenericContext';

export const createLoadingSelector =
  (actions: string[]) =>
  <T,>(state: T): boolean => {
    // returns true only when all actions is not loading
    return actions.some((action) => state.api.loading[action]);
  };
