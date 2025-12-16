import { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { useIntl } from 'react-intl';

import useScreenSize from '@/shared/hooks/use-screen-size';
import { Button } from '@/shared/ui/core/button';
import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';
import { cn } from '@/shared/utils/style.utils';

import CheckboxDropdownFilterItem from './components/checkbox-dropdown-filter-item';
import InputDropdownFilterItem from './components/input-dropdown-filter-item';
import SelectDropdownFilterItem from './components/select-dropdown-filter-item';
import { useDropdownFilterForm } from './hooks/use-dropdown-filter-form';
import { Item } from './types/dropdown-filter.types';

import './dropdown-filter.scss';

const dropdownFilterAnimation = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.25 },
    display: 'block',
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: { duration: 0.25 },
    transitionEnd: { display: 'none' },
  },
};

export type DropdownFilterProps = {
  label: string;
  items: Item[];
  icon?: IconType;
  width?: number;
  className?: string;
  onApply?: (values: Record<string, any>) => void;
};

function DropdownFilter({ icon, label, items, width, className, onApply }: DropdownFilterProps) {
  const { formatMessage } = useIntl();
  const { isGreaterThan } = useScreenSize();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = useCallback(() => {
    if (items.length === 0) return;

    setIsOpen((prev) => !prev);
  }, [items.length]);

  const dropdownRight = useMemo(() => (width ? '0' : 'unset'), [width]);
  const dropdownWidth = useMemo(() => (isGreaterThan('md') ? width || '100%' : undefined), [width, isGreaterThan]);

  const { control, activeFilters, onClear, onSubmit } = useDropdownFilterForm({ items, onApply });

  const renderItemByType = useCallback(
    (item: Item) => {
      switch (item.type) {
        case 'checkbox':
          return <CheckboxDropdownFilterItem control={control} item={item} />;
        case 'input':
          return <InputDropdownFilterItem control={control} item={item} />;
        case 'select':
          return <SelectDropdownFilterItem control={control} item={item} />;
        default:
          return null;
      }
    },
    [control]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn('dropdown-filter', className)}>
      <div className="dropdown-filter__button-wrapper">
        <Button variant="outline" onClick={onToggle}>
          <Icon as={icon} size={16} />
          {isGreaterThan('sm') && label}
        </Button>

        {!!activeFilters && <div className="dropdown-filter__active-filters-dot" />}
      </div>

      <motion.div
        className="dropdown-filter__dropdown"
        initial="exit"
        animate={isOpen ? 'enter' : 'exit'}
        variants={dropdownFilterAnimation}
        style={{ right: dropdownRight, width: dropdownWidth }}
      >
        <form onSubmit={onSubmit}>
          <div className="dropdown-filter__dropdown-head">
            <Text variant="body-l">{formatMessage({ id: 'app.ui.data.dropdownFilter.title' })}</Text>

            <Button variant="ghost" className="dropdown-filter__clear-all" onClick={onClear}>
              {formatMessage({ id: 'app.ui.data.dropdownFilter.clearAll' })}
            </Button>
          </div>

          <div className="dropdown-filter__dropdown-filters">
            {items.map((item) => (
              <Fragment key={item.name}>{renderItemByType(item)}</Fragment>
            ))}
          </div>

          <div className="dropdown-filter__dropdown-footer">
            <Button variant="outline" onClick={onToggle}>
              {formatMessage({ id: 'common.form.close' })}
            </Button>

            <Button type="submit">{formatMessage({ id: 'common.form.apply' })}</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default memo(DropdownFilter);
