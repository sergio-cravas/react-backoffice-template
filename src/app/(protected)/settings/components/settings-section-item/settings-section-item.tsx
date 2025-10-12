import { PropsWithChildren } from 'react';

import classNames from 'clsx';

import { Text } from '@/shared/ui/core/text';

import './settings-section-item.scss';

type SettingsSectionItemProps = PropsWithChildren<{
  title: string;
  subtitle: string | React.ReactNode;
  titleColor?: string;
  align?: 'center' | 'start' | 'end';
}>;

function SettingsSectionItem({ title, subtitle, titleColor, align = 'center', children }: SettingsSectionItemProps) {
  return (
    <div
      className={classNames('settings-section-item', `settings-section-item--align-${align}`, {
        'settings-section-item--has-node-subtitle': typeof subtitle !== 'string',
      })}
    >
      <div className="settings-section-item__head">
        <Text variant="body-l" weight="medium" color={titleColor}>
          {title}
        </Text>

        {typeof subtitle === 'string' ? (
          <Text variant="body-m" color="contentDarkSecondary">
            {subtitle}
          </Text>
        ) : (
          subtitle
        )}
      </div>

      {children}
    </div>
  );
}

export default SettingsSectionItem;
