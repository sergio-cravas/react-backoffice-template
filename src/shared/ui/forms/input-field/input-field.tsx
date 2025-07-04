import { Control, Controller, ControllerProps, FieldValues, Path } from 'react-hook-form';

import { Input, type InputProps } from '@/shared/ui/core/input';

import { FieldContainer } from '../field-container';

type InputFieldProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  errorMessage?: string;
  control: Control<FormValues, any>;
  inputProps?: Partial<InputProps>;
  style?: React.CSSProperties;
} & Omit<ControllerProps<FormValues>, 'render'>;

function InputField<FormValues extends FieldValues>({
  name,
  control,
  errorMessage,
  inputProps = {},
  style,
  ...props
}: InputFieldProps<FormValues>) {
  return (
    <Controller
      {...props}
      name={name}
      control={control}
      render={({ field: { onChange, ...renderProps }, fieldState: { error } }) => (
        <FieldContainer error={errorMessage || error?.message} style={style}>
          <Input {...renderProps} invalid={!!error} onChange={onChange} {...inputProps} />
        </FieldContainer>
      )}
    />
  );
}

export default InputField;
