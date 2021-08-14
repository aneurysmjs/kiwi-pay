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

export type Valueof<T> = T[keyof T];

export type Alphabet =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

export type Digits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type IsLetter<Letter> = Letter extends Alphabet ? Letter : never;
