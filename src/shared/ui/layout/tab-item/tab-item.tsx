import { useMemo } from 'react';

import useScreenSize from '@/shared/hooks/use-screen-size';
import { Option } from '@/shared/types/form.types';
import { cn } from '@/shared/utils/style.utils';

import { Icon } from '../../core/icon';
import { Text } from '../../core/text';

import './tab-item.scss';

type TabItemProps = {
  tab: Option<string>;
  activeTab: string;
  onTabChange: (tab: string) => void;
};

function TabItem({ tab, activeTab, onTabChange }: TabItemProps) {
  const isActive = useMemo(() => activeTab === tab.value, [activeTab, tab.value]);

  const { isGreaterThan } = useScreenSize();

  return (
    <div className={cn('tab-item', { 'tab-item--active': isActive })} onClick={() => onTabChange(tab.value)}>
      {!!tab.icon && <Icon as={tab.icon} variant={isActive ? 'primary' : 'outline'} />}

      {isGreaterThan('sm') && (
        <Text variant="body-m" weight="medium" color={isActive ? 'contentDarkPrimary' : 'contentDarkSecondary'}>
          {tab.label}
        </Text>
      )}
    </div>
  );
}

TabItem.displayName = 'TabItem';

export default TabItem;
