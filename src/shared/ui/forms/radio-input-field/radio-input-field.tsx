import { Control, Controller, ControllerProps, FieldValues, Path } from 'react-hook-form';

import { RadioInput, type RadioInputProps } from '@/shared/ui/core/radio-input';

import { FieldContainer } from '../field-container';

type RadioInputFieldProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  label?: string;
  errorMessage?: string;
  control: Control<FormValues, any>;
  inputProps?: Partial<RadioInputProps<string>> & Pick<RadioInputProps<string>, 'options'>;
  style?: React.CSSProperties;
} & Omit<ControllerProps<FormValues>, 'render'>;

function RadioInputField<FormValues extends FieldValues>({
  name,
  label,
  control,
  errorMessage,
  inputProps = {
    options: [],
  },
  style,
  ...props
}: RadioInputFieldProps<FormValues>) {
  return (
    <Controller
      {...props}
      name={name}
      control={control}
      render={({ field: { value, ref, onChange, ...renderProps }, fieldState: { error } }) => (
        <FieldContainer error={errorMessage || error?.message} style={style}>
          <RadioInput {...renderProps} value={value} onChange={onChange} {...inputProps} />
        </FieldContainer>
      )}
    />
  );
}

export default RadioInputField;
