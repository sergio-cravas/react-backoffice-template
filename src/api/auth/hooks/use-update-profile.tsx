import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@/shared/store/auth';
import { HookMutateQueryConfig } from '@/shared/types/common.types';

import { updateProfile } from '../clients/update-profile';

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
