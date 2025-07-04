import { useMemo } from 'react';

import ReactSelect, { Options } from 'react-select';

import { Option } from '@/shared/types/form.types';

import { Text } from '../text';
import { selectStyles } from './select.styles';

import './select.scss';

export type SelectProps<T = string> = {
  name?: string;
  label?: string;
  value?: Option<T> | string;
  options: Options<Option<T>>;
  required?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  placeholder?: string;
  onChange: (value: Option<T>) => void;
};

function Select<T = string>({
  name,
  label,
  value,
  options = [],
  invalid,
  required,
  placeholder,
  errorMessage,
  onChange,
}: SelectProps<T>) {
  const styles = useMemo(() => selectStyles({ invalid }), [invalid]);

  const finalValue = useMemo(() => {
    if (!value) return null;

    if (typeof value === 'string') {
      return options.find((option) => option.value === value) || null;
    }

    return value;
  }, [value, options]);

  return (
    <div className="select">
      {label ? (
        <label className="select__label" htmlFor={name}>
          {required ? `${label} *` : label}
        </label>
      ) : null}

      <ReactSelect
        name={name}
        value={finalValue}
        options={options}
        required={required}
        placeholder={placeholder}
        styles={styles}
        onChange={onChange}
        menuPosition="fixed"
        components={{
          IndicatorSeparator: () => null,
        }}
      />

      {!!errorMessage && (
        <Text as="span" variant="body-s" color="interactionRedBase">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

export default Select;
