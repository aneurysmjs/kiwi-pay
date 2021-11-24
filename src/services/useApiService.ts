import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

interface UseApiMeta {
  data: {
    hits: never[];
  };
  isLoading: boolean;
  isError: boolean;
}

type UseApi = [UseApiMeta, Dispatch<SetStateAction<string>>];

// eslint-disable-next-line import/prefer-default-export
export const useApi = (): UseApi => {
  const [data, setData] = useState({ hits: [] });
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/users');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
