import { useCallback } from 'react';
import { useSearchParams as useSearchParamsRRD } from 'react-router-dom';

export const useSearchParams = (): [URLSearchParams, (key: string, value: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParamsRRD();

  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      updatedSearchParams.set(key, value);

      setSearchParams(updatedSearchParams.toString());
    },
    [searchParams, setSearchParams]
  );

  return [searchParams, updateSearchParams];
};
