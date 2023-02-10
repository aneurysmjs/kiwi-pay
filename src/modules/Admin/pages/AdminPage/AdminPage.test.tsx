import {
  screen,
  //@ts-ignore
  act,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { expect, it, jest } from '@jest/globals';

import * as cryptoService from '@/services/cryptoService';
import renderWithRedux from '@/store/helpers/renderWithRedux';
import AdminPage from './AdminPage';

const mockData = {
  time: {
    updated: 'Feb 8, 2023 21:36:00 UTC',
    updatedISO: '2023-02-08T21:36:00+00:00',
    updateduk: 'Feb 8, 2023 at 21:36 GMT',
  },
  disclaimer: 'lorem ipsum',
  chartName: 'Bitcoin',
  bpi: {
    USD: {
      code: 'USD',
      symbol: '&#36;',
      rate: '22,928.8291',
      description: 'United States Dollar',
      rate_float: 22928.8291,
    },
    GBP: {
      code: 'GBP',
      symbol: '&pound;',
      rate: '19,159.1462',
      description: 'British Pound Sterling',
      rate_float: 19159.1462,
    },
    EUR: {
      code: 'EUR',
      symbol: '&euro;',
      rate: '22,336.0272',
      description: 'Euro',
      rate_float: 22336.0272,
    },
  },
};

jest.mock('@/services/cryptoService');
const { getCryptoCurrentPrice } = cryptoService as jest.Mocked<typeof cryptoService>;

describe('AdminPage', () => {
  beforeEach(() => {
    getCryptoCurrentPrice.mockReset();
  });
  afterEach(jest.restoreAllMocks);

  it('calls getCryptoCurrentPrice to get info', async () => {
    // @ts-ignore there's no need to full mock Axio's response
    getCryptoCurrentPrice.mockResolvedValue({ data: mockData });
    // @ts-ignore
    let renderer = {} as RenderResult;

    // await act(() => {
    //   renderer = renderWithRedux(<AdminPage />);
    // });

    // await act(async () => {
    //   renderer = renderWithRedux(<AdminPage />);
    // });

    renderer = renderWithRedux(<AdminPage />);

    // we wait until the loader appears
    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeNull());

    expect(getCryptoCurrentPrice).toHaveBeenCalledTimes(1);

    expect(screen.queryByTestId('loader')).toBeNull();
  });

  it('renders error message ', async () => {
    getCryptoCurrentPrice.mockRejectedValue({ message: 'Network Error' });

    renderWithRedux(<AdminPage />);

    expect(getCryptoCurrentPrice).toHaveBeenCalledTimes(1);

    // we wait until the loader appears
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeNull();
      expect(screen.queryByRole('alert')?.textContent).toBe('Network Error');
    });
  });
});
