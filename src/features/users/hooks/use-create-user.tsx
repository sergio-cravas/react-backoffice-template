import { useMutation } from '@tanstack/react-query';

import { HookMutateQueryConfig } from '@/shared/types/common.types';

import { createUser } from '../clients/create-user';

export const useCreateUser = (config: HookMutateQueryConfig = {}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: createUser,
    onSuccess: config.onSuccess,
    onError: config.onError,
  });

  return {
    createUser: mutate,
    error,
    isPending,
  };
};
