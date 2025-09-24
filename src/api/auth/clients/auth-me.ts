import { get } from '@/api/api';

import { User } from '../../users/models/user';

type AuthMeResponse = {
  user: User;
};

export const authMe = async (): Promise<AuthMeResponse> => {
  return get('/auth/me');
};
