import { Control, Controller, ControllerProps, FieldValues, Path } from 'react-hook-form';

import { Textarea, type TextareaProps } from '@/shared/ui/core/textarea';

import { FieldContainer } from '../field-container';

type TextareaFieldProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  errorMessage?: string;
  control: Control<FormValues, any>;
  inputProps?: Partial<TextareaProps>;
  style?: React.CSSProperties;
} & Omit<ControllerProps<FormValues>, 'render'>;

function TextareaField<FormValues extends FieldValues>({
  name,
  control,
  errorMessage,
  inputProps = {},
  style,
  ...props
}: TextareaFieldProps<FormValues>) {
  return (
    <Controller
      {...props}
      name={name}
      control={control}
      render={({ field: { onChange, ...renderProps }, fieldState: { error } }) => (
        <FieldContainer error={errorMessage || error?.message} style={style}>
          <Textarea {...renderProps} invalid={!!error} onChange={onChange} {...inputProps} />
        </FieldContainer>
      )}
    />
  );
}

export default TextareaField;
