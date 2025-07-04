import { PropsWithChildren } from 'react';

import { FieldError } from '../field-error';

type FieldContainerProps = PropsWithChildren<{
  error?: string;
  style?: React.CSSProperties;
}>;

function FieldContainer({ error, style, children }: FieldContainerProps) {
  return (
    <div style={style}>
      {children}

      {error ? <FieldError message={error} style={{ marginTop: 4, marginLeft: 16 }} /> : null}
    </div>
  );
}

export default FieldContainer;
