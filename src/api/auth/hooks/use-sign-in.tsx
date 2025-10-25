import { useMutation } from '@tanstack/react-query';

import { HookMutateQueryConfig } from '@/shared/types/common.types';

import { useAuth } from './use-auth';
import { signIn } from '../clients/sign-in';

export const useSignIn = (config: HookMutateQueryConfig = {}) => {
  const { login } = useAuth();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signIn,
    onSuccess: async (response) => {
      login({ ...response });

      config.onSuccess?.(response);
    },
    onError: (error) => {
      config.onError?.(error);
    },
  });

  return {
    signIn: mutate,
    error,
    isPending,
  };
};
