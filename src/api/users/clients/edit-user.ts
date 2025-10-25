import { put } from '@/api/api';

import { User } from '../models/user';

type EditUserRequest = {
  id: User['id'];
  body: Partial<User>;
};

type EditUserResponse = {
  user: User;
};

export const editUser = async ({ id, body }: EditUserRequest): Promise<EditUserResponse> => {
  return put(`/users/${id}`, { ...body });
};
