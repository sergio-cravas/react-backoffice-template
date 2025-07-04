import { post } from '@/api/api';

type SetNewPasswordRequest = {
  code: string;
  token: string;
  password: string;
};

type SetNewPasswordResponse = {
  success: boolean;
};

export const setNewPassword = async ({
  code,
  token,
  password,
}: SetNewPasswordRequest): Promise<SetNewPasswordResponse> => {
  return post('/auth/set-new-password', { code, token, password });
};
