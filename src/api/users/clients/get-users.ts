import { get } from '@/api/api';
import { User } from '@/api/users/models/user';
import { List, SortBy } from '@/shared/types/common.types';

type GetUsersRequest = {
  page: number;
  limit: number;
  sortBy?: SortBy;
  role?: User['role'];
  name?: string;
  isDeleted?: boolean;
};

type GetUsersResponse = List<User>;

export const getUsers = async ({ page, limit, sortBy, ...params }: GetUsersRequest): Promise<GetUsersResponse> => {
  let fullUrl = `/users?page=${page}&limit=${limit}`;

  if (sortBy) {
    fullUrl += `&sortBy=${sortBy.key}&direction=${sortBy.direction}`;
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) fullUrl += `&${key}=${value}`;
  });

  return get(fullUrl);
};

export type { GetUsersRequest };
