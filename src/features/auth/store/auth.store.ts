import { create, ExtractState } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getRememberState } from '@/features/config/store';

import { User } from '../models/user';

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  updateUser: (user: User) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuth: false,
      login: (user: User, token: string) => {
        set({ user, token, isAuth: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuth: false });
      },
      updateUser: (user: User) => {
        set((state) => ({ ...state, user }));
      },
    }),
    {
      name: 'rbt-auth',
      storage: createJSONStorage(() => (getRememberState() ? localStorage : sessionStorage)),
      partialize: (state) => ({ user: state.user, isAuth: state.isAuth, token: state.token }),
    }
  )
);

const accessTokenSelector = (state: ExtractState<typeof useAuthStore>) => state.token;

export const getAccessToken = () => accessTokenSelector(useAuthStore.getState());
export const resetAccessToken = () => useAuthStore.setState({ token: null });
export const changeStorageConfig = (remember: boolean) => {
  useAuthStore.persist.setOptions({ storage: createJSONStorage(() => (remember ? localStorage : sessionStorage)) });
};
