import { Control, Controller, ControllerProps, FieldValues, Path } from 'react-hook-form';

import { type CheckboxProps } from '@/shared/ui/core/checkbox';

import { Checkbox } from '../../core/checkbox';
import { FieldContainer } from '../field-container';

type CheckboxFieldProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  errorMessage?: string;
  control: Control<FormValues, any>;
  inputProps?: Partial<CheckboxProps>;
  style?: React.CSSProperties;
} & Omit<ControllerProps<FormValues>, 'render'>;

function CheckboxField<FormValues extends FieldValues>({
  name,
  control,
  errorMessage,
  inputProps = {},
  style,
  ...props
}: CheckboxFieldProps<FormValues>) {
  return (
    <Controller
      {...props}
      name={name}
      control={control}
      render={({ field: { value, onChange, ...renderProps }, fieldState: { error } }) => (
        <FieldContainer error={errorMessage || error?.message} style={style}>
          <Checkbox {...renderProps} checked={value} onCheckedChange={onChange} {...inputProps} />
        </FieldContainer>
      )}
    />
  );
}

export default CheckboxField;
