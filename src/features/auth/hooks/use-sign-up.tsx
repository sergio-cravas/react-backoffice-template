import { useMutation } from '@tanstack/react-query';

import { HookMutateQueryConfig } from '@/shared/types/common.types';

import { signUp } from '../clients/sign-up';
import { useAuth } from './use-auth';

export const useSignUp = (config: HookMutateQueryConfig = {}) => {
  const { login } = useAuth();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signUp,
    onSuccess: async (response) => {
      login({ ...response });

      config.onSuccess?.(response);
    },
    onError: (error) => {
      config.onError?.(error);
    },
  });

  return {
    signUp: mutate,
    error,
    isPending,
  };
};
