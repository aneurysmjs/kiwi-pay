/* eslint-disable no-underscore-dangle */
import { AnyAction } from 'redux';

/**
 * @param
 */
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
};

/**
 * @link https://phryneas.de/redux-typescript-no-discriminating-union
 * @param actionCreator
 *
 */
export function withMatcher<AC extends () => AnyAction>(actionCreator: AC): Matchable<AC>;
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(
  actionCreator: AC,
): Matchable<AC>;
export function withMatcher<AC extends (...args: any[]) => AnyAction>(
  actionCreator: AC,
  type: ReturnType<AC>['type'],
): Matchable<AC>;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function withMatcher(actionCreator: Function & { type?: string }, _type?: string) {
  const type = _type ?? actionCreator.type ?? actionCreator().type;

  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}
