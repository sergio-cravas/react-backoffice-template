// stores/langStore.ts
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
  initializeLocale: () => void;
}

type LangStore = LangState & LangActions;

const getBrowserLocale = (): LocaleOption => {
  return navigator.language === 'en' || navigator.language.startsWith('en-') ? 'en' : 'es';
};

const getMessages = (locale: LocaleOption): Record<string, string> => {
  return locale === 'en' ? en : es;
};

export const useLangStore = create<LangStore>()(
  persist(
    (set, get) => ({
      // State
      locale: DEFAULT_LOCALE,
      localeOptions,
      messages: getMessages(DEFAULT_LOCALE),

      // Actions
      updateLocale: (newLocale: LocaleOption) => {
        if (!localeOptions.includes(newLocale)) {
          throw new Error(`¡Locale ${newLocale} not defined!`);
        }

        set({
          locale: newLocale,
          messages: getMessages(newLocale),
        });
      },

      initializeLocale: () => {
        const currentLocale = get().locale;
        const browserLocale = getBrowserLocale();

        // Si el locale actual es el default, usar el del browser
        if (currentLocale === DEFAULT_LOCALE) {
          const finalLocale = browserLocale || DEFAULT_LOCALE;
          set({
            locale: finalLocale,
            messages: getMessages(finalLocale),
          });
        }
      },
    }),
    {
      name: 'lang_preference',
      partialize: (state) => ({ locale: state.locale }), // Solo persistir el locale
    }
  )
);
