import { useCallback, useEffect, useState } from 'react';

import cn from 'classnames';
import { MdCheck } from 'react-icons/md';

import { Icon } from '../icon';

import './checkbox.scss';

export type CheckboxProps = {
  name: string;
  label?: React.ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
  value?: boolean;
  className?: string;
  onChange?: (value: any) => void;
};

export function Checkbox({
  name,
  label,
  disabled,
  readOnly,
  className,
  value = false,
  onChange,
  ...props
}: CheckboxProps) {
  const [checked, setChecked] = useState<boolean>(value);

  useEffect(() => {
    if (value !== undefined) setChecked(value);
  }, [value]);

  const handleOnCheck = useCallback(
    (event) => {
      if (readOnly) return;
      event.stopPropagation();
      const newValue = !checked;

      setChecked(newValue);
      onChange && onChange(newValue);
    },
    [checked, onChange, readOnly]
  );

  return (
    <div
      className={`checkbox ${disabled ? 'checkbox--disabled' : ''} ${className || ''}`}
      onClick={disabled ? () => undefined : handleOnCheck}
    >
      <div
        id={name}
        tabIndex={0}
        className={cn('checkbox__input', {
          'checkbox__input--disabled': disabled,
          'checkbox__input--read-only': readOnly,
          'checkbox__input--checked': checked,
        })}
        {...props}
      >
        {checked && <Icon as={MdCheck} color="white" />}
      </div>

      {!!label && (
        <label htmlFor={name} className="checkbox__label">
          {label}
        </label>
      )}
    </div>
  );
}
