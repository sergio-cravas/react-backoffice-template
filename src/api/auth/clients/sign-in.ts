import { post } from '@/api/api';

import { User } from '../../users/models/user';

type SignInRequest = {
  email: string;
  password: string;
};

type SignInResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const signIn = async ({ email, password }: SignInRequest): Promise<SignInResponse> => {
  return post('/auth/sign-in', { email, password });
};

export type { SignInRequest, SignInResponse };
