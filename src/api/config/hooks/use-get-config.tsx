import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/api/query-keys';
import { getQueryOptions } from '@/api/query-options';
import { useConfigStore } from '@/shared/store/config';

import { getConfig } from '../clients/get-config';

export const useGetConfig = () => {
  const { config, updateConfig } = useConfigStore();

  const { data, isLoading, isSuccess, isError, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.CONFIG],
    queryFn: () => getConfig(),
    ...getQueryOptions(true),
  });

  useEffect(() => {
    if (isSuccess) updateConfig(data);
  }, [data, isSuccess, updateConfig]);

  return {
    config: data ?? config,
    isSuccess,
    isError,
    isLoading,
    isFetching,
  };
};
