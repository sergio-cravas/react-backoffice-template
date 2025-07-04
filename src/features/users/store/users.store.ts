import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserPageView, UserRole } from '@/features/auth/models/user';
import { SortBy } from '@/shared/types/common.types';

export type UserFilters = { name?: string; role?: UserRole; isDeleted?: boolean };

type UsersStore = {
  view: UserPageView;
  category?: UserRole;
  pagination: { page: number; limit: number };
  sortBy?: SortBy;
  filter?: UserFilters;
  changeView: (view: UserPageView) => void;
  changeCategory: (category: UserRole) => void;
  changePage: (page: number) => void;
  changeLimit: (limit: number) => void;
  changeSortBy?: (sortBy: SortBy) => void;
  changeFilters?: (filters: UserFilters) => void;
};

const defaultPagination = { page: 1, limit: 10 };

export const useUsersStore = create<UsersStore>()(
  persist(
    (set) => ({
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
      changeFilters: (filters) => set((state) => ({ filter: { ...state.filter, ...filters } })),
    }),
    {
      name: 'rbt-users',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        view: state.view,
        category: state.category,
        pagination: state.pagination,
        sortBy: state.sortBy,
        filter: state.filter,
      }),
    }
  )
);
