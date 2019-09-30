import { AppState } from '~/store/helpers/configureStore';

export interface Action<P> {
  type: string;
  payload: P;
}

export interface ApiMetaType {
  types?: Array<string>;
  callAPI?: () => Promise<any>;
  shouldCallAPI?: (S: AppState) => boolean;
}
