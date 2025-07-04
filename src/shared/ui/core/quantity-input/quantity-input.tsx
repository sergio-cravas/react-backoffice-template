import { useCallback, useState } from 'react';

import classNames from 'classnames';
import { MdAdd, MdOutlineRemove } from 'react-icons/md';

import { Icon } from '../icon';

import './quantity-input.scss';

type Props = {
  name?: string;
  label?: string;
  className?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export function QuantityInput({ name, label, className, min, max, step, defaultValue = 0, onChange }: Props) {
  const [value, setValue] = useState<number>(defaultValue);

  const handleOnChange = useCallback(
    (inputValue: number | string) => {
      let newValue = +inputValue;

      if (min !== undefined) newValue = Math.max(+min, newValue);
      if (max !== undefined) newValue = Math.min(+max, newValue);

      setValue(newValue);
      onChange?.(isNaN(newValue) ? 0 : newValue);
    },
    [max, min, onChange]
  );

  return (
    <div className={classNames('quantity-input', className)}>
      {label && <label className="quantity-input__label">{label}</label>}

      <div className="quantity-input__field">
        <Icon
          as={MdOutlineRemove}
          size={40}
          disabled={min !== undefined ? value <= +min : false}
          onClick={() => handleOnChange(value - 1)}
        />

        <input
          name={name}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          className="quantity-input__field__input"
          onChange={(event) => handleOnChange(event.target.value)}
        />

        <Icon
          as={MdAdd}
          size={40}
          disabled={max !== undefined ? value >= +max : false}
          onClick={() => handleOnChange(value + 1)}
        />
      </div>
    </div>
  );
}
