import { useMutation } from '@tanstack/react-query';

import { HookMutateQueryConfig } from '@/shared/types/common.types';

import { resetPassword } from '../clients/reset-password';

export const useResetPassword = (config: HookMutateQueryConfig = {}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (response) => {
      config.onSuccess?.(response);
    },
    onError: (error) => {
      config.onError?.(error);
    },
  });

  return {
    resetPassword: mutate,
    error,
    isPending,
  };
};
