import React, { forwardRef, Ref, useCallback, useEffect, useState } from 'react';

import cn from 'clsx';
import { MdErrorOutline } from 'react-icons/md';

import { Text } from '../text';

import './textarea.scss';

export type TextareaProps = {
  name: string;
  label?: string;
  value?: string;
  invalid?: boolean;
  errorMessage?: string;
  className?: string;
  rightElement?: React.ReactNode | string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
} & Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'onChange'>;

export const Textarea = forwardRef(
  (
    { name, label, value, className, invalid, errorMessage, rightElement, style, onChange, ...props }: TextareaProps,
    ref: Ref<HTMLTextAreaElement>
  ) => {
    const { required, disabled } = props;

    const [inputValue, setInputValue] = useState<string>(value || '');

    useEffect(() => {
      setInputValue(value || '');
    }, [value]);

    const handleOnChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newInputValue: string = event.target.value;

        setInputValue(newInputValue);
        onChange?.(newInputValue);
      },
      [onChange]
    );

    const renderRightElement = () => {
      if (invalid)
        return (
          <div className="textarea-container__field__right-icon">
            <MdErrorOutline size={24} color="#ff0000" />
          </div>
        );

      return rightElement && <div className="textarea-container__field__right-icon">{rightElement}</div>;
    };

    return (
      <div className={cn('textarea-container', className)} style={style}>
        {!!label && (
          <label className="textarea-container__label" htmlFor={name}>
            {required ? `${label} *` : label}
          </label>
        )}

        <div className="textarea-container__field">
          <textarea
            {...props}
            ref={ref}
            className={cn('textarea-container__field__content', {
              'textarea-container__field__content--disabled': disabled,
              'textarea-container__field__content--invalid': invalid,
            })}
            name={name}
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

Textarea.displayName = 'Textarea';
