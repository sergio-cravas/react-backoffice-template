import { post } from '@/api/api';

import { User } from '../models/user';

type CreateUserRequest = {
  body: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
};

type CreateUserResponse = {
  user: User;
};

export const createUser = async ({ body }: CreateUserRequest): Promise<CreateUserResponse> => {
  return post('/users', { ...body });
};
