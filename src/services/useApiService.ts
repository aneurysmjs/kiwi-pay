import { useEffect, useState, Dispatch, SetStateAction, useReducer, useRef, Reducer } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface UseApiMeta {
  data: {
    foo: never[];
  };
  isLoading: boolean;
  isError: boolean;
}

type AnyAction = { type: string };

type Action = { payload?: unknown } & AnyAction;

export interface FetchState<T = unknown> {
  isLoading: boolean;
  isError: boolean;
  data: T;
}

type UseApi<T> = [FetchState<T>, Dispatch<SetStateAction<string>>];

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

type FetchInitAction = { type: typeof FETCH_REQUEST };
type FetchSuccesAction<T = any> = { type: typeof FETCH_SUCCESS; payload: T };
type FetchFailureAction = { type: typeof FETCH_FAILURE };

type FetchReducerActions = FetchInitAction | FetchSuccesAction | FetchFailureAction;

const dataFetchReducer: Reducer<FetchState, FetchReducerActions> = (state, action) => {
  if (action.type === FETCH_REQUEST) {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  }

  if (action.type === FETCH_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: action.payload,
    };
  }

  if (action.type === FETCH_FAILURE) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

// const getReducer = <T> =

const useApi = <T>(
  mainUrl: string,
  initialData: T,
  config: AxiosRequestConfig = { method: 'GET' },
): UseApi<T> => {
  const [url, setUrl] = useState(mainUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  const configRef = useRef(config);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_REQUEST });

      try {
        const result = await axios(url, configRef.current);

        dispatch({ type: FETCH_SUCCESS, payload: result.data });
      } catch (error) {
        dispatch({ type: FETCH_FAILURE });
      }
    };

    fetchData();
  }, [url]);

  return [state, setUrl];
};

export default useApi;
