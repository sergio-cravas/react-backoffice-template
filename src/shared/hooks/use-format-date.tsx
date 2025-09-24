import { useCallback, useMemo } from 'react';

import { format as formatDFNS, FormatOptions } from 'date-fns';
import { enUS, es } from 'date-fns/locale';

import { useLangStore } from '../store/lang';

export const useDateFns = () => {
  const { locale } = useLangStore();

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
