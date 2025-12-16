import React, { forwardRef, Ref, useCallback, useEffect, useState } from 'react';

import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { useIntl } from 'react-intl';

import { cn } from '@/shared/utils/style.utils';

import { Label } from '../label';
import { Text } from '../text';

import './input.scss';

export type InputProps = {
  name: string;
  label?: string;
  value?: string;
  invalid?: boolean;
  errorMessage?: string;
  className?: string;
  leftElement?: React.ReactNode | string;
  rightElement?: React.ReactNode | string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef(
  (
    {
      name,
      label,
      value,
      className,
      invalid,
      errorMessage,
      leftElement,
      rightElement,
      style,
      type,
      required,
      disabled,
      pattern,
      min,
      max,
      step,
      onChange,
      ...props
    }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const { formatMessage } = useIntl();

    const [inputValue, setInputValue] = useState<string>(value || '');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    useEffect(() => {
      setInputValue(value || '');
    }, [value]);

    const handleOnChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        let newInputValue: string = event.target.value;

        if (min && newInputValue < min) newInputValue = min + '';
        if (max && newInputValue > max) newInputValue = max + '';

        setInputValue(newInputValue);

        onChange?.(newInputValue);
      },
      [min, max, onChange]
    );

    const renderLeftElement = () => {
      return leftElement && <div className="input-container__field__left-icon">{leftElement}</div>;
    };

    const renderRightElement = () => {
      if (type === 'password' && !disabled && !props.readOnly) {
        return (
          <div className="input-container__field__right-icon" onClick={() => setIsPasswordVisible((prev) => !prev)}>
            {isPasswordVisible ? (
              <MdOutlineVisibilityOff size={24} aria-label={formatMessage({ id: 'app.ui.core.input.hidePassword' })} />
            ) : (
              <MdOutlineVisibility size={24} aria-label={formatMessage({ id: 'app.ui.core.input.showPassword' })} />
            )}
          </div>
        );
      }

      return rightElement && <div className="input-container__field__right-icon">{rightElement}</div>;
    };

    return (
      <div className={cn('input-container', className)} style={style}>
        {!!label && <Label htmlFor={name}>{required ? `${label} *` : label}</Label>}

        <div className="input-container__field">
          {renderLeftElement()}

          <input
            {...props}
            ref={ref}
            data-slot="input"
            className={cn(
              'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
              { 'pl-8': !!leftElement },
              className
            )}
            name={name}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
            disabled={disabled}
            required={required}
            value={inputValue}
            type={isPasswordVisible ? 'text' : type}
            onChange={handleOnChange}
          />

          {renderRightElement()}
        </div>

        {!!errorMessage && (
          <Text as="span" variant="body-s" color="danger">
            {errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
