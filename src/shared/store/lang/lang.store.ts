import { enUS, es as esES } from 'date-fns/locale';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { en } from '@/shared/translations/en';
import { es } from '@/shared/translations/es';
import { DEFAULT_LOCALE, LocaleOption, localeOptions } from '@/shared/types/lang.types';

interface LangState {
  locale: LocaleOption;
  localeOptions: readonly LocaleOption[];
  messages: Record<string, string>;
}

interface LangActions {
  updateLocale: (newLocale: LocaleOption) => void;
}

type LangStore = LangState & LangActions;

const getBrowserLocale = (): LocaleOption => {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;
  return navigator.language === 'en' || navigator.language.startsWith('en-') ? 'en' : 'es';
};

const getMessages = (locale: LocaleOption): Record<string, string> => {
  return locale === 'en' ? en : es;
};

export const getDatefnsMessages = (locale: LocaleOption) => {
  return { en: enUS, es: esES }[locale];
};

export const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      locale: getBrowserLocale(),
      localeOptions,
      messages: getMessages(getBrowserLocale()),

      updateLocale: (newLocale: LocaleOption) => {
        if (!localeOptions.includes(newLocale)) {
          throw new Error(`¡Locale ${newLocale} not defined!`);
        }

        set({
          locale: newLocale,
          messages: getMessages(newLocale),
        });
      },
    }),
    {
      name: 'lang_preference',
      partialize: (state) => ({ locale: state.locale }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.messages = getMessages(state.locale);
        }
      },
    }
  )
);

const localeSelector = (state: LangStore) => state.locale;

export const getLocaleState = () => localeSelector(useLangStore.getState());
