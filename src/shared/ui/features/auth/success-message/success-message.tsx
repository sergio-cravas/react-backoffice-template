import { memo } from 'react';

import { Text } from '@/shared/ui/core/text';

import './success-message.scss';

type SuccessMessageProps = {
  title: string;
  subtitle: string;
};

function SuccessMessage({ title, subtitle }: SuccessMessageProps) {
  return (
    <div className="success-message">
      <Text as="h1" variant="h3">
        {title}
      </Text>

      <Text variant="body-l" color="contentSecondary">
        {subtitle}
      </Text>
    </div>
  );
}

export default memo(SuccessMessage);
