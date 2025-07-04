import { useMutation } from '@tanstack/react-query';

import { HookMutateQueryConfig } from '@/shared/types/common.types';

import { updateProfile } from '../clients/update-profile';
import { useAuthStore } from '../store';

export const useUpdateProfile = (config: HookMutateQueryConfig = {}) => {
  const { updateUser } = useAuthStore();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateProfile,
    onSuccess: async (response) => {
      if (response?.user?.id) updateUser({ ...response?.user });

      config.onSuccess?.(response);
    },
    onError: config.onError,
  });

  return {
    updateProfile: mutate,
    error,
    isPending,
  };
};
