import { useCallback, useMemo } from 'react';

import { useIntl } from 'react-intl';

import { useLangStore } from '@/shared/store/lang';
import { Option } from '@/shared/types/form.types';
import { LocaleOption } from '@/shared/types/lang.types';
import { Select } from '@/shared/ui/core/select';

function LanguageSelect() {
  const { formatMessage } = useIntl();
  const { locale, localeOptions, updateLocale } = useLangStore();

  const onSelect = useCallback((option: Option<LocaleOption>) => updateLocale(option.value), [updateLocale]);

  const options = localeOptions.map((lang) => ({
    value: lang,
    label: formatMessage({ id: `common.language.${lang}` }),
  }));

  const selectedOption = useMemo(() => options.find((opt) => opt.value === locale), [locale, options]);

  return <Select value={selectedOption} options={options} onChange={onSelect} />;
}

export default LanguageSelect;
