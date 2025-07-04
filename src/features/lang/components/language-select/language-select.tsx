import { useCallback, useContext } from 'react';

import { useIntl } from 'react-intl';

import { Option } from '@/shared/types/form.types';
import { Select } from '@/shared/ui/core/select';

import { LangContext } from '../../context/lang.context';
import { LocaleOption } from '../../types/lang.types';

function LanguageSelect() {
  const { formatMessage } = useIntl();
  const { locale, localeOptions, updateLocale } = useContext(LangContext);

  const onSelect = useCallback((option: Option<LocaleOption>) => updateLocale(option.value), [updateLocale]);

  const options = localeOptions.map((lang) => ({
    value: lang,
    label: formatMessage({ id: `common.language.${lang}` }),
  }));

  const selectedOption = options.find((opt) => opt.value === locale);

  return <Select value={selectedOption} options={options} onChange={onSelect} />;
}

export default LanguageSelect;
