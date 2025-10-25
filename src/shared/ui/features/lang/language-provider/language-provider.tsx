// components/LangProvider.tsx
import { useEffect, type PropsWithChildren } from 'react';

import { IntlProvider } from 'react-intl';

import { useLangStore } from '@/shared/store/lang';
import { DEFAULT_LOCALE } from '@/shared/types/lang.types';

function LanguageProvider({ children }: PropsWithChildren) {
  const { locale, messages, initializeLocale } = useLangStore();

  useEffect(() => {
    initializeLocale();
  }, [initializeLocale]);

  return (
    <IntlProvider locale={locale} defaultLocale={DEFAULT_LOCALE} messages={messages}>
      {children}
    </IntlProvider>
  );
}

export default LanguageProvider;
