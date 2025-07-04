import React, { forwardRef, Ref, useCallback, useEffect, useState } from 'react';

import cn from 'classnames';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

import { Text } from '../text';

import './input.scss';

export type InputProps = {
  name: string;
  label?: string;
  value?: string;
  invalid?: boolean;
  errorMessage?: string;
  className?: string;
  rightElement?: React.ReactNode | string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef(
  (
    { name, label, value, className, invalid, errorMessage, rightElement, style, onChange, ...props }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const { type, required, disabled, pattern, min, max, step } = props;

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

    const renderRightElement = () => {
      if (type === 'password' && !disabled && !props.readOnly) {
        return (
          <div className="input-container__field__right-icon" onClick={() => setIsPasswordVisible((prev) => !prev)}>
            {isPasswordVisible ? <MdOutlineVisibilityOff size={24} /> : <MdOutlineVisibility size={24} />}
          </div>
        );
      }

      return rightElement && <div className="input-container__field__right-icon">{rightElement}</div>;
    };

    return (
      <div className={cn('input-container', className)} style={style}>
        {!!label && (
          <label className="input-container__label" htmlFor={name}>
            {required ? `${label} *` : label}
          </label>
        )}

        <div className="input-container__field">
          <input
            {...props}
            ref={ref}
            className={cn('input-container__field__content', {
              'input-container__field__content--invalid': invalid,
              'input-container__field__content--disabled': disabled,
              'input-container__field__content--number-input': type === 'number',
            })}
            name={name}
            type={isPasswordVisible ? 'text' : type}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
            disabled={disabled}
            required={required}
            value={inputValue}
            onChange={handleOnChange}
          />

          {renderRightElement()}
        </div>

        {!!errorMessage && (
          <Text as="span" variant="body-s" color="interactionRedBase">
            {errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
