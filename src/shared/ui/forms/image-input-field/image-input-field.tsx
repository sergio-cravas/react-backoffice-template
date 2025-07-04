import { Control, Controller, ControllerProps, FieldValues, Path } from 'react-hook-form';

import { ImageInput, type ImageInputProps } from '../../core/image-input';
import { FieldContainer } from '../field-container';

type ImageInputFieldProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  errorMessage?: string;
  control: Control<FormValues, any>;
  inputProps?: Partial<ImageInputProps>;
  style?: React.CSSProperties;
} & Omit<ControllerProps<FormValues>, 'render'>;

function InputField<FormValues extends FieldValues>({
  name,
  control,
  errorMessage,
  inputProps = {},
  style,
  ...props
}: ImageInputFieldProps<FormValues>) {
  return (
    <Controller
      {...props}
      name={name}
      control={control}
      render={({ field: { onChange, ...renderProps }, fieldState: { error } }) => (
        <FieldContainer error={errorMessage || error?.message} style={style}>
          <ImageInput {...renderProps} invalid={!!error} onChange={onChange} {...inputProps} />
        </FieldContainer>
      )}
    />
  );
}

export default InputField;
