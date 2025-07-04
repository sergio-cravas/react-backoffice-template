import { JSX, memo, useCallback, useState } from 'react';

import { SortBy } from '@/shared/types/common.types';

import { Column } from '../../types/list.types';
import { ListHeaderCell } from '../list-header-cell';

import './list-header.scss';

type ListHeaderProps<T> = {
  columns: Column<T>[];
  minWidth: number;
  onSort?: (value: SortBy) => void;
};

function ListHeader<T>({ columns = [], minWidth, onSort }: ListHeaderProps<T>) {
  const [sortBy, setSortBy] = useState<SortBy | undefined>(undefined);

  const handleSort = useCallback(
    (column: Column<T>) => {
      if (!column?.sortable || !onSort) return;

      let newSortBy: SortBy | undefined;

      if (sortBy?.key === column.key) {
        switch (sortBy.direction) {
          case 'asc':
            newSortBy = { key: column.key, direction: 'desc' };
            break;
          case 'desc':
            newSortBy = undefined;
            break;
          default:
            newSortBy = { key: column.key, direction: 'asc' };
        }
      } else {
        newSortBy = { key: column.key, direction: 'asc' };
      }

      setSortBy(newSortBy);
      onSort(newSortBy);
    },
    [sortBy, onSort]
  );

  return (
    <div className="list-header">
      {columns?.map((column, index) => (
        <ListHeaderCell
          key={`header-column-${index}`}
          column={column}
          minWidth={minWidth}
          sortBy={sortBy?.key === column.key ? sortBy : undefined}
          onSort={() => handleSort(column)}
        />
      ))}
    </div>
  );
}

export default memo(ListHeader) as <T>(props: ListHeaderProps<T>) => JSX.Element;
