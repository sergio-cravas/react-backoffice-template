import { createContext, useCallback, useEffect, useState, type PropsWithChildren } from 'react';

import { IntlProvider } from 'react-intl';

import { en } from '@/features/lang/translations/en';
import { es } from '@/features/lang/translations/es';
import { DEFAULT_LOCALE, LocaleOption, localeOptions } from '@/features/lang/types/lang.types';

type LangContextProps = {
  locale: LocaleOption;
  localeOptions: readonly LocaleOption[];
  updateLocale: (newOption: LocaleOption) => void;
};

export const LangContext = createContext<LangContextProps>({
  locale: DEFAULT_LOCALE,
  localeOptions: [],
  updateLocale: () => {},
});

export const LangContextProvider = ({ children }: PropsWithChildren) => {
  const browserLocale: LocaleOption = navigator.language === 'en' || navigator.language.startsWith('en-') ? 'en' : 'es';

  const getInitialLocale = (): LocaleOption => {
    const memoryLocale = localStorage.getItem('lang_preference');

    if (memoryLocale && localeOptions.includes(memoryLocale as LocaleOption)) {
      return memoryLocale as LocaleOption;
    }

    return browserLocale || DEFAULT_LOCALE;
  };

  const [locale, setLocale] = useState<LocaleOption>(getInitialLocale());
  const [messages, setMessages] = useState<Record<string, string>>(locale === 'en' ? en : es);

  const getLanguage = useCallback(() => {
    if (locale === 'en') return en;
    else return es;
  }, [locale]);

  const updateLocale = useCallback((value: LocaleOption) => {
    if (!localeOptions.includes(value)) throw new Error(`¡Locale ${value} not defined!`);

    localStorage.setItem('lang_preference', value);
    setLocale(value);
  }, []);

  useEffect(() => {
    setMessages(getLanguage());
  }, [locale, getLanguage]);

  return (
    <LangContext.Provider value={{ locale, localeOptions, updateLocale }}>
      <IntlProvider locale={locale} defaultLocale={DEFAULT_LOCALE} messages={messages}>
        {children}
      </IntlProvider>
    </LangContext.Provider>
  );
};
