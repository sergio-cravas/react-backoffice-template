import { useCallback, useState } from 'react';

import { useSearchParams } from '@/shared/hooks/use-search-params';

type UsePaginationProps = {
  defaultPage?: number;
  defaultLimit?: number;
  fromSearchParams?: boolean;
};

export const usePagination = ({ defaultPage = 1, defaultLimit = 10, fromSearchParams = false }: UsePaginationProps) => {
  const [searchParams, updateSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(
    fromSearchParams && searchParams.get('page') ? parseInt(searchParams.get('page') as string) : defaultPage
  );

  const [limit, setLimit] = useState<number>(
    fromSearchParams && searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : defaultLimit
  );

  const onPrev = useCallback(() => {
    const newPage = page === 0 ? page : page - 1;

    fromSearchParams && updateSearchParams('page', newPage.toString());
    setPage(newPage);
  }, [fromSearchParams, page, updateSearchParams]);

  const onNext = useCallback(() => {
    const newPage = page + 1;

    fromSearchParams && updateSearchParams('page', newPage.toString());
    setPage(newPage);
  }, [fromSearchParams, page, updateSearchParams]);

  const updatePage = useCallback(
    (newPage: number) => {
      if (newPage > 0) {
        fromSearchParams && updateSearchParams('page', newPage.toString());
        setPage(newPage);
      }
    },
    [fromSearchParams, updateSearchParams]
  );

  const updateLimit = useCallback(
    (newLimit: number) => {
      if (newLimit > 0) {
        fromSearchParams && updateSearchParams('limit', newLimit.toString());
        setLimit(newLimit);
      }
    },
    [fromSearchParams, updateSearchParams]
  );

  const reset = useCallback(() => {
    if (fromSearchParams) {
      updateSearchParams('page', defaultPage.toString());
      updateSearchParams('limit', defaultLimit.toString());
    }

    setPage(defaultPage);
    setLimit(defaultLimit);
  }, [defaultPage, defaultLimit, fromSearchParams, updateSearchParams]);

  return { page, limit, onPrev, onNext, updatePage, updateLimit, reset };
};
