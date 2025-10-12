import { DetailedHTMLProps, JSX, memo } from 'react';

import classNames from 'clsx';

import { SortBy } from '@/shared/types/common.types';
import { Pagination } from '@/shared/ui/layout/pagination';

import { ListHeader } from './components/list-header';
import { ListRow } from './components/list-row';
import { Column } from './types/list.types';

import './list.scss';

type ListProps<T> = {
  data: T[];
  page: number;
  total: number;
  limit: number;
  columns: Column<T>[];
  getRowKey: (item: T) => string | number;
  onPageChange: (page: number) => void;
  onRowClick?: (item: T) => void;
  onColumnSort?: (value: SortBy) => void;
} & DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function List<T = Record<string, any>>({
  data = [],
  page = 1,
  total,
  limit = 10,
  columns = [],
  className,
  getRowKey,
  onPageChange,
  onRowClick,
  onColumnSort,
  ...props
}: ListProps<T>) {
  const minWidth = 200;

  return (
    <div className={classNames('list', className)} {...props}>
      <div className="list__body">
        <ListHeader<T> columns={columns} minWidth={minWidth} onSort={onColumnSort} />

        {data.map((item, index) => (
          <ListRow<T>
            key={`item-${index}`}
            row={item}
            columns={columns}
            minWidth={minWidth}
            onClick={() => onRowClick?.(item)}
          />
        ))}
      </div>

      <Pagination page={page} total={total} limit={limit} onPageChange={onPageChange} />
    </div>
  );
}

export default memo(List) as <T>(props: ListProps<T>) => JSX.Element;
