import { useContext, useLayoutEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/api/query-keys';
import { LangContext } from '@/features/lang/context/lang.context';

import { authMe } from '../clients/auth-me';
import { useAuthStore } from '../store';

export const useProfile = () => {
  const { token, user, updateUser } = useAuthStore();
  const { locale } = useContext(LangContext);

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
