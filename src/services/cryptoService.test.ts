import axios from 'axios';
import { expect, it, jest } from '@jest/globals';

import { getCryptoCurrentPrice } from './cryptoService';

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

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('crypto-service', () => {
  afterEach(jest.clearAllMocks);

  it('resolves information about currencies', async () => {
    mockAxios.get.mockResolvedValue({ data: mockData });
    const response = await getCryptoCurrentPrice();

    expect(response.data).toStrictEqual(mockData);
  });

  it('rejects due bad request', async () => {
    const networkError = new Error('Network Error');
    mockAxios.get.mockRejectedValue(networkError);

    await expect(getCryptoCurrentPrice()).rejects.toStrictEqual(networkError);
  });
});
