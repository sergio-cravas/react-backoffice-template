import { CompanyEntity } from '@/shared/types/common.types';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export type User = CompanyEntity<{
  firstName: string;
  lastName: string;
  imageUrl?: string;
  email: string;
  role: UserRole;
  phone: string;
  permissions: string[];
}>;

export enum UserPageView {
  LIST = 'list',
  GRID = 'grid',
}
