import { useCallback, useEffect, useState } from 'react';

import cn from 'clsx';

import { Text } from '@/shared/ui/core/text';

import './switch-input.scss';

export interface SwitchInputProps {
  name: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: boolean;
  onChange: (value: boolean) => void;
}

export function SwitchInput({ label, name, error, disabled, className, defaultValue, onChange }: SwitchInputProps) {
  const [checked, setChecked] = useState<boolean>(!!defaultValue);

  const handleOnClick = useCallback((event) => event.stopPropagation(), []);

  const handleOnChange = useCallback(
    (event) => {
      event.stopPropagation();
      onChange(event.target.checked);
      setChecked(event.target.checked);
    },
    [onChange]
  );

  useEffect(() => {
    if (defaultValue !== undefined) setChecked(defaultValue);
  }, [defaultValue]);

  return (
    <div className="switch-input">
      <div className={cn('switch-input__input-container', className)}>
        {!!label && (
          <Text as="span" variant="body-m" className="switch-input__text">
            {label}
          </Text>
        )}

        <label htmlFor={name} className={cn('switch-input__switch', { 'switch-input--disabled': disabled })}>
          <input
            id={name}
            name={name}
            className="switch-input__input"
            type="checkbox"
            checked={checked}
            onClick={handleOnClick}
            onChange={handleOnChange}
            disabled={disabled}
          />

          <span className="switch-input__slider" />
        </label>
      </div>

      {error && <p className="switch-input__error">{error}</p>}
    </div>
  );
}
