import { post } from '@/api/api';

type ResetPasswordRequest = {
  email: string;
};

type ResetPasswordResponse = {
  success: boolean;
};

export const resetPassword = async ({ email }: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  return post('/auth/reset-password', { email });
};
