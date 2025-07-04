import { CSSProperties } from 'react';

import { Text } from '@/shared/ui/core/text';

type FieldLabelProps = {
  label: string;
  style?: CSSProperties;
};

function FieldLabel({ label, style }: FieldLabelProps) {
  return (
    <Text variant="body-m" color="contentDarkPrimary" style={style}>
      {label}
    </Text>
  );
}

export default FieldLabel;
