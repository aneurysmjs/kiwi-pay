import type { AppState } from '@/store/helpers/configureStore';

export interface Action<P> {
  type: string;
  payload: P;
}

export interface ApiMetaType {
  types?: Array<string>;
  callAPI?: () => Promise<any>;
  shouldCallAPI?: (S: AppState) => boolean;
}
export interface AsyncState {
  isLoading: boolean;
  error: boolean | null;
}
