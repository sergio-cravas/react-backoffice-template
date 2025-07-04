import { useMutation } from '@tanstack/react-query';

import { HookMutateQueryConfig } from '@/shared/types/common.types';

import { editUser } from '../clients/edit-user';

export const useEditUser = (config: HookMutateQueryConfig = {}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: editUser,
    onSuccess: config.onSuccess,
    onError: config.onError,
  });

  return {
    editUser: mutate,
    error,
    isPending,
  };
};
