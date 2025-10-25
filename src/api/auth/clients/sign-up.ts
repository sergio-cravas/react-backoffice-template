import { post } from '@/api/api';

import { User } from '../../users/models/user';

type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type SignUpResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const signUp = async ({ firstName, lastName, email, password }: SignUpRequest): Promise<SignUpResponse> => {
  return post('/auth/sign-up', { firstName, lastName, email, password });
};
