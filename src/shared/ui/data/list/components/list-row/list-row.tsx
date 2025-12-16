import { JSX, memo } from 'react';

import { cn } from '@/shared/utils/style.utils';

import { Column } from '../../types/list.types';
import { ListCell } from '../list-cell';

import './list-row.scss';

type ListRowProps<T> = {
  row: T;
  columns: Column<T>[];
  minWidth: number;
  onClick?: () => void;
};

function ListRow<T>({ row, columns = [], minWidth, onClick }: ListRowProps<T>) {
  return (
    <div className={cn(`list-row`, { 'list-row--clickable': !!onClick })} onClick={onClick}>
      {columns?.map((column, index) => (
        <ListCell<T>
          key={`row-${index}`}
          row={row}
          column={column}
          className="list-row__cell"
          style={{ minWidth: column.width || minWidth }}
        />
      ))}
    </div>
  );
}

export default memo(ListRow) as <T>(props: ListRowProps<T>) => JSX.Element;
