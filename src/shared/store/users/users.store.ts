import { create } from 'zustand';

import { UserPageView, UserRole } from '@/api/users/models/user';
import { Pagination, SortBy } from '@/shared/types/common.types';

export type UserFilters = { name?: string; role?: UserRole; isDeleted?: boolean };

type UsersStore = {
  view: UserPageView;
  pagination: Pagination;
  sortBy?: SortBy;
  filter?: UserFilters;
  category?: UserRole;
  changeView: (view: UserPageView) => void;
  changeCategory: (category: UserRole) => void;
  changePage: (page: number) => void;
  changeLimit: (limit: number) => void;
  changeSortBy?: (sortBy: SortBy) => void;
  changeFilters?: (filters: UserFilters) => void;
};

const defaultPagination = { page: 1, limit: 10 };

export const useUsersStore = create<UsersStore>((set) => ({
  view: UserPageView.LIST,
  category: UserRole.ADMIN,
  pagination: defaultPagination,
  sortBy: undefined,
  filter: undefined,
  changeView: (view) => set({ view, pagination: defaultPagination }),
  changeCategory: (category) =>
    set((state) => ({
      category: state.category === category ? undefined : category,
      pagination: defaultPagination,
    })),
  changePage: (page) => set((state) => ({ pagination: { ...state.pagination, page } })),
  changeLimit: (limit) => set((state) => ({ pagination: { ...state.pagination, limit } })),
  changeSortBy: (sortBy: SortBy | undefined) => set({ sortBy }),
  changeFilters: (filters) => {
    if (!filters || !Object.keys(filters)?.length) set({ filter: undefined });
    else set((state) => ({ filter: { ...state.filter, ...filters } }));
  },
}));
