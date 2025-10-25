import { useLayoutEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/api/query-keys';
import { useAuthStore } from '@/shared/store/auth';
import { useLangStore } from '@/shared/store/lang';

import { authMe } from '../clients/auth-me';

export const useProfile = () => {
  const { locale } = useLangStore();
  const { token, user, updateUser } = useAuthStore();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QUERY_KEYS.AUTH.ME, locale, token],
    queryFn: authMe,
  });

  const me = useMemo(() => data?.user || user, [data?.user, user]);

  useLayoutEffect(() => {
    if (data?.user?.id) updateUser(data?.user);
  }, [data, updateUser]);

  return {
    me,
    isError,
    isLoading,
    isSuccess,
  };
};
