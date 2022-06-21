import { useCallback, useEffect, useState } from 'react';

export type FetchState<T> = 'loading' | { type: 'error'; error: Error } | T;
export type ReturnType<T> = { state: FetchState<T>; refetch: () => void };

export const useUncleFetcher = <T>(url: string): ReturnType<T> => {
  const [state, setState] = useState<FetchState<T>>('loading');

  const refetch = useCallback(() => {
    fetch(url, { mode: 'no-cors' })
      .then((response) =>
        response
          .json()
          .then((json) => {
            setState(json);
          })
          .catch((error) => {
            setState({ type: 'error', error });
          }),
      )
      .catch((error) => {
        setState({ type: 'error', error });
      });
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    state,
    refetch,
  };
};
