import { useMemo } from 'react';

import ReactSelect, { ClassNamesConfig, Options } from 'react-select';

import { Option } from '@/shared/types/form.types';
import { cn } from '@/shared/utils/style.utils';

import { Label } from '../label';
import { Text } from '../text';

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
  className?: string;
  autoFocus?: boolean;
  onChange: (value: Option<T>) => void;
  onBlur?: () => void;
};

const getSelectClassNames = ({ invalid = false }: { invalid?: boolean }): ClassNamesConfig => ({
  container: () => 'w-full',
  control: ({ isFocused }) =>
    cn(
      'h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm cursor-pointer',
      'hover:border-ring',
      isFocused && 'border-ring ring-ring/50 ring-[3px]',
      !isFocused && !invalid && 'border-input',
      invalid && 'ring-destructive/20 dark:ring-destructive/40 border-destructive'
    ),
  valueContainer: () => '!p-0 gap-1',
  input: () => '!p-0 !m-0',
  singleValue: () => 'text-foreground',
  placeholder: () => 'text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis',
  indicatorsContainer: () => 'gap-1',
  dropdownIndicator: () => 'text-muted-foreground hover:text-foreground !p-0',
  clearIndicator: () => 'text-muted-foreground hover:text-foreground !p-0',
  menu: () => 'mt-1 rounded-md border border-input bg-white shadow-md overflow-hidden !z-50',
  menuList: () => 'p-1 bg-white',
  option: ({ isSelected, isFocused }) =>
    cn(
      'rounded-sm px-2 py-1.5 text-sm cursor-pointer bg-white',
      isSelected && '!bg-primary !text-primary-foreground',
      !isSelected && isFocused && '!bg-accent !text-accent-foreground',
      !isSelected && !isFocused && 'text-foreground'
    ),
  noOptionsMessage: () => 'text-muted-foreground text-sm py-2',
});

function Select<T = string>({
  name,
  label,
  value,
  options = [],
  invalid,
  required,
  autoFocus,
  placeholder,
  errorMessage,
  className,
  onChange,
  onBlur,
}: SelectProps<T>) {
  const classNames = useMemo(() => getSelectClassNames({ invalid }), [invalid]);

  const finalValue = useMemo(() => {
    if (!value) return null;

    if (typeof value === 'string') {
      return options.find((option) => option.value === value) || null;
    }

    return value;
  }, [value, options]);

  return (
    <div className={cn('select', className)}>
      {label ? <Label htmlFor={name}>{required ? `${label} *` : label}</Label> : null}

      <ReactSelect
        name={name}
        autoFocus={autoFocus}
        value={finalValue}
        options={options}
        required={required}
        placeholder={placeholder}
        classNames={classNames}
        unstyled
        onChange={onChange}
        onBlur={onBlur}
        menuPosition="fixed"
        components={{
          IndicatorSeparator: () => null,
        }}
      />

      {!!errorMessage && (
        <Text as="span" variant="body-s" color="danger">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

export default Select;
