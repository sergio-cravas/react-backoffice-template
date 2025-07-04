import { Control, Controller, ControllerProps, FieldValues, Path } from 'react-hook-form';

import { Select, type SelectProps } from '@/shared/ui/core/select';

import { FieldContainer } from '../field-container';

type SelectFieldProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  errorMessage?: string;
  control: Control<FormValues, any>;
  inputProps?: Partial<SelectProps<string>> & Pick<SelectProps<string>, 'options'>;
  style?: React.CSSProperties;
} & Omit<ControllerProps<FormValues>, 'render'>;

function SelectField<FormValues extends FieldValues>({
  name,
  control,
  errorMessage,
  inputProps = {
    options: [],
  },
  style,
  ...props
}: SelectFieldProps<FormValues>) {
  return (
    <Controller
      {...props}
      name={name}
      control={control}
      render={({ field: { onChange, ...renderProps }, fieldState: { error } }) => (
        <FieldContainer error={errorMessage || error?.message} style={style}>
          <Select {...renderProps} invalid={!!error} onChange={onChange} {...inputProps} />
        </FieldContainer>
      )}
    />
  );
}

export default SelectField;
