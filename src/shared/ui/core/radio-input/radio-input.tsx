import { useCallback } from 'react';

import { Option } from '@/shared/types/form.types';
import { cn } from '@/shared/utils/style.utils';

import { Text } from '../text';

import './radio-input.scss';

export type RadioInputProps<T> = {
  name: string;
  label?: string;
  options?: Option<T>[];
  allowDeselect?: boolean;
  value: Option<T>['value'];
  errorMessage?: string;
  onChange: (value?: Option<T>['value']) => void;
};

function RadioInput<T = string>({
  name,
  label,
  options,
  allowDeselect = true,
  value,
  errorMessage,
  onChange,
}: RadioInputProps<T>) {
  const handleOnChange = useCallback(
    (option: Option<T>) => {
      const newValue = option.value === value && allowDeselect ? undefined : option.value;

      onChange(newValue);
    },
    [value, allowDeselect, onChange]
  );

  return (
    <fieldset className="radio-input">
      {label ? <label className="radio-input__label">{label}</label> : null}

      <div className="radio-input__options">
        {options?.map((option, index) => (
          <label key={`${name}-option-${index}`} className="radio-input__options__field">
            <div
              className={cn('radio-input__options__field__right-icon', {
                'radio-input__options__field__right-icon--checked': value === option.value,
              })}
            />

            {option.label}

            <input
              type="radio"
              name={name}
              checked={value ? value === option.value : undefined}
              onClick={() => handleOnChange(option)}
            />
          </label>
        ))}
      </div>

      {!!errorMessage && (
        <Text as="span" variant="body-s" color="interactionRedBase">
          {errorMessage}
        </Text>
      )}
    </fieldset>
  );
}

export default RadioInput;
