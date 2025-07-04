import { useMemo } from 'react';

import { MdCalendarToday } from 'react-icons/md';

import { useDateFns } from '@/shared/hooks/use-format-date';
import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';

import { Column } from '../../../types/list.types';

type ListCellDateProps<T> = {
  row: T;
  column: Column<T>;
};

function ListCellDate<T>({ row, column }: ListCellDateProps<T>) {
  const { format } = useDateFns();

  const data = useMemo(() => {
    const value = row[column.key];

    return format(value, 'P') ?? 'Invalid date';
  }, [row, column.key, format]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon as={MdCalendarToday} size={16} variant="outline" />

      <Text variant="body-m" color="contentDarkSecondary">
        {data}
      </Text>
    </div>
  );
}

export default ListCellDate;
