import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/api/query-keys';

import { getUsers, GetUsersRequest } from '../clients/get-users';

export const useGetUsers = (params: GetUsersRequest) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USERS.LIST, ...Object.values(params)],
    queryFn: () => getUsers({ ...params }),
  });

  return {
    users: data,
    error,
    isLoading,
  };
};
