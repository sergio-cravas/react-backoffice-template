import { Text } from '@/shared/ui/core/text';

type FieldErrorProps = {
  message: string;
  style?: React.CSSProperties;
};

function FieldError({ message, style }: FieldErrorProps) {
  return (
    <Text variant="body-s" color="interactionRedBase" style={style}>
      {message}
    </Text>
  );
}

export default FieldError;
