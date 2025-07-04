import { useMutation } from '@tanstack/react-query';

import { HookMutateQueryConfig } from '@/shared/types/common.types';

import { setNewPassword } from '../clients/set-new-password';

export const useSetNewPassword = (config: HookMutateQueryConfig = {}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: setNewPassword,
    onSuccess: async (response) => {
      config.onSuccess?.(response);
    },
    onError: (error) => {
      config.onError?.(error);
    },
  });

  return {
    setNewPassword: mutate,
    error,
    isPending,
  };
};
