import classNames from 'clsx';

import { Option } from '@/shared/types/form.types';

import { TabItem } from '../tab-item';

import './tabs.scss';

type TabsProps = {
  className?: string;
  tabs: Option<string>[];
  activeTab: string;
  onTabChange: (tab: string) => void;
};

function Tabs({ tabs = [], activeTab, className, onTabChange }: TabsProps) {
  return (
    <div className={classNames('tabs', className)}>
      {tabs.map((tab) => (
        <TabItem key={tab.value} tab={tab} activeTab={activeTab} onTabChange={onTabChange} />
      ))}
    </div>
  );
}

Tabs.displayName = 'Tabs';

export default Tabs;
