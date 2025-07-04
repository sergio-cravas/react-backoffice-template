import { memo } from 'react';

import { MdAdd, MdFilterList, MdOutlineFilterAlt } from 'react-icons/md';
import { useIntl } from 'react-intl';

import useScreenSize from '@/shared/hooks/use-screen-size';
import { Option } from '@/shared/types/form.types';

import { Button } from '../../core/button';
import { Icon } from '../../core/icon';
import { Menu, type MenuProps } from '../../core/menu';
import { Text } from '../../core/text';
import { DropdownFilter, type DropdownFilterProps } from '../../data/dropdown-filter';
import { Divider } from '../divider';
import { Tabs } from '../tabs';

import './section-header.scss';

type SectionHeaderProps = {
  title: string;
  views?: {
    view: string;
    options: Option<string>[];
    onChange: (view: string) => void;
  };
  sortBy?: { items: MenuProps['items'] };
  filter?: { items: DropdownFilterProps['items']; onApply: DropdownFilterProps['onApply'] };
  add?: { label: string; onClick: () => void };
};

function SectionHeader({ title, views, sortBy, filter, add }: SectionHeaderProps) {
  const { formatMessage } = useIntl();
  const { isGreaterThan } = useScreenSize();

  return (
    <div className="section-header">
      <div className="section-header__title">
        <Text as="h1" variant="h5">
          {title}
        </Text>
      </div>

      {!!views && (
        <Tabs
          className="section-header__tabs"
          tabs={views.options}
          activeTab={views.view}
          onTabChange={views.onChange}
        />
      )}

      <div className="section-header__actions">
        {!!sortBy && (
          <Menu
            width={320}
            icon={MdFilterList}
            label={formatMessage({ id: 'app.ui.layout.sectionHeader.sortBy' })}
            {...sortBy}
          />
        )}

        {!!filter && (
          <DropdownFilter
            width={320}
            icon={MdOutlineFilterAlt}
            label={formatMessage({ id: 'app.ui.layout.sectionHeader.filter' })}
            {...filter}
          />
        )}

        {!!add && (
          <>
            <Divider vertical className="section-header__divider" />

            <Button
              variant="primary"
              icon={<Icon as={MdAdd} size={16} variant="secondary" />}
              label={isGreaterThan('sm') ? add.label : undefined}
              onClick={add.onClick}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default memo(SectionHeader);
