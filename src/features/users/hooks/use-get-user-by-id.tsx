import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/api/query-keys';

import { getUserById, GetUserByIdRequest } from '../clients/get-user-by-id';

export const useGetUserById = (params: GetUserByIdRequest) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USERS.DETAIL, ...Object.values(params)],
    queryFn: () => getUserById({ ...params }),
    enabled: !!params.id,
  });

  return {
    user: data?.user,
    error,
    isLoading,
  };
};
