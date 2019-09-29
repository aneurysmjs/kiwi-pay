import { AppState } from '~/store/helpers/configureStore';

export interface ApiMetaType {
  types?: Array<string>;
  callAPI?: () => Promise<any>;
  shouldCallAPI?: (S: AppState) => boolean;
}
