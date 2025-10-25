import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/shared/store/auth';

import { SignInResponse } from '../clients/sign-in';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { login, logout } = useAuthStore();

  const onLogin = useCallback(
    async ({ user, accessToken }: SignInResponse) => {
      login(user, accessToken);
    },
    [login]
  );

  const onLogout = useCallback(() => {
    queryClient.clear();

    logout();
  }, [queryClient, logout]);

  return {
    login: onLogin,
    logout: onLogout,
  };
};
