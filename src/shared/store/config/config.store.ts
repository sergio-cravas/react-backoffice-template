import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Config } from '@/api/config/models/config';
import { ExtractState } from '@/shared/types/store.types';

import { changeStorageConfig } from '../auth';

type ConfigStore = {
  config: Config;
  remember: boolean;
  updateConfig: (newConfig: Config) => void;
  setRemember: (remember: boolean) => void;
};

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      config: undefined,
      remember: false,
      updateConfig: (newConfig: Config) => {
        set({ config: newConfig });
      },
      setRemember: (remember: boolean) => {
        set({ remember });
        changeStorageConfig(remember);
      },
    }),
    {
      name: 'rbt-config',
      partialize: (state) => ({
        config: state.config,
        remember: state.remember,
      }),
    }
  )
);

const configSelector = (state: ExtractState<typeof useConfigStore>) => state.config;
const rememberSelector = (state: ExtractState<typeof useConfigStore>) => state.remember;

export const getConfigState = () => configSelector(useConfigStore.getState());
export const getRememberState = () => rememberSelector(useConfigStore.getState());
