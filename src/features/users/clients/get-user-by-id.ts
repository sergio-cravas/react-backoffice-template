import { get } from '@/api/api';
import { User } from '@/features/auth/models/user';

type GetUserByIdRequest = {
  id?: User['id'];
};

type GetUserByIdResponse = {
  user: User;
};

export const getUserById = async ({ id }: GetUserByIdRequest): Promise<GetUserByIdResponse> => {
  if (!id) throw new Error('User ID is required');

  return get(`/users/${id}`);
};

export type { GetUserByIdRequest };
