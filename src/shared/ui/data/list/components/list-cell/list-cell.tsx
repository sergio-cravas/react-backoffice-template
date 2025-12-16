import { JSX, memo, useMemo } from 'react';

import { cn } from '@/shared/utils/style.utils';

import ListCellDate from './components/list-cell-date';
import ListCellEmail from './components/list-cell-email';
import ListCellPhone from './components/list-cell-phone';
import ListCellSelect from './components/list-cell-select';
import ListCellText from './components/list-cell-text';
import { Column } from '../../types/list.types';

import './list-cell.scss';

type ListCellProps<T> = {
  row: T;
  column: Column<T>;
  className?: string;
  style?: React.CSSProperties;
};

function ListCell<T>({ row, column, className, style }: ListCellProps<T>) {
  const cellContentByType = useMemo(
    () => ({
      ['text']: <ListCellText row={row} column={column} />,
      ['date']: <ListCellDate row={row} column={column} />,
      ['email']: <ListCellEmail row={row} column={column} />,
      ['phone']: <ListCellPhone row={row} column={column} />,
      ['select']: (
        <ListCellSelect
          row={row}
          column={column as Column<T> & { type: 'select'; options: { value: string; label: string }[] }}
        />
      ),
      ['custom']: column.render ? column.render(row) : null,
    }),
    [row, column]
  );

  return (
    <div className={cn('list-cell', className)} style={style}>
      {cellContentByType[column.type]}
    </div>
  );
}

export default memo(ListCell) as <T>(props: ListCellProps<T>) => JSX.Element;
