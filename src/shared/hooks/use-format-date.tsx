import { useCallback, useContext, useMemo } from 'react';

import { format as formatDFNS, FormatOptions } from 'date-fns';
import { enUS, es } from 'date-fns/locale';

import { LangContext } from '@/features/lang/context/lang.context';

export const useDateFns = () => {
  const { locale } = useContext(LangContext);

  const dateFnsLocale = useMemo(() => {
    const value = { ['en']: enUS, ['es']: es }[locale];

    return value || es;
  }, [locale]);

  const format = useCallback(
    (value: any, pattern: string, options: FormatOptions = {}) => {
      if (typeof value !== 'string' && !(value instanceof Date)) return null;

      return formatDFNS(new Date(value), pattern, { locale: dateFnsLocale, ...options });
    },
    [dateFnsLocale]
  );

  return { format };
};
