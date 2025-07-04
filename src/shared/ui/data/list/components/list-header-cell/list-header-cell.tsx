import { memo } from 'react';

import { LuChevronDown, LuChevronsUpDown, LuChevronUp } from 'react-icons/lu';

import { SortBy } from '@/shared/types/common.types';
import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';

import { Column } from '../../types/list.types';

import './list-header-cell.scss';

type ListHeaderCellProps<T> = {
  column: Column<T>;
  minWidth: number;
  sortBy?: SortBy;
  onSort?: () => void;
};

function ListHeaderCell<T>({ column, minWidth, sortBy, onSort }: ListHeaderCellProps<T>) {
  return (
    <div className="list-header-cell" style={{ minWidth: column.width || minWidth }}>
      <Text variant="body-m" color="contentDarkSecondary">
        {column.label}
      </Text>

      {column.sortable && !!onSort && (
        <Icon
          as={
            sortBy?.direction === 'asc' ? LuChevronUp : sortBy?.direction === 'desc' ? LuChevronDown : LuChevronsUpDown
          }
          size={16}
          variant={sortBy ? 'primary' : 'outline'}
          onClick={onSort}
        />
      )}
    </div>
  );
}

export default memo(ListHeaderCell);
