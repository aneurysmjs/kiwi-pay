/**
 * @see https://github.com/testing-library/react-hooks-testing-library#a-note-about-react-18-support
 */
import { renderHook } from '@testing-library/react';
import { expect, it, jest } from '@jest/globals';
import * as mockReactRedux from 'react-redux';

import Wrapper from '@/store/helpers/Wrapper';
import { useCryptoActions } from './actions';

const mockDispatch = jest.fn<ReturnType<typeof mockReactRedux.useDispatch>>();

jest.mock('react-redux', () => {
  const originalModule = jest.requireActual<typeof mockReactRedux>('react-redux');

  return {
    __esModule: true,
    ...originalModule,
    useDispatch: () => mockDispatch,
  };
});

describe('crypto-actions', () => {
  afterEach(jest.clearAllMocks);

  it('returns and object with the correct api actions', () => {
    const { result } = renderHook(() => useCryptoActions(), { wrapper: Wrapper });

    expect(result.current).toHaveProperty('getCryptoCurrentPrice');
  });

  describe('getCryptoCurrentPrice', () => {
    it('should', () => {
      const { result } = renderHook(() => useCryptoActions(), { wrapper: Wrapper });

      const { getCryptoCurrentPrice } = result.current;

      getCryptoCurrentPrice();

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.any(Object),
          type: expect.stringContaining('ASYNC_ACTION_TYPE'),
        }),
      );
    });
  });
});
