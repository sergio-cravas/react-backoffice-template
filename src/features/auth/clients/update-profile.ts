import { put } from '@/api/api';

import { User } from '../models/user';

type UpdateProfileRequest = Partial<Pick<User, 'firstName' | 'lastName'>>;

type UpdateProfileResponse = {
  user: User;
};

export const updateProfile = async ({ firstName, lastName }: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
  return put('/auth/me', { firstName, lastName });
};
