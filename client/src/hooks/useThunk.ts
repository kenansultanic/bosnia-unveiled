import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';

export function useThunk<T>(thunk: (arg: T) => any): [Function, boolean, any] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const runThunk = useCallback(
    (arg: T) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: any) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}