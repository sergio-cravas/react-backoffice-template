import { DetailedHTMLProps, JSX, memo } from 'react';

import classNames from 'classnames';

import { GridCard } from './components/grid-card';
import { Pagination } from '../../layout/pagination';

import './grid.scss';

type GridProps<T> = {
  data: T[];
  page: number;
  total: number;
  limit: number;
  gap?: number;
  rowHeight?: { min?: string; max?: string };
  columnWidth?: { min?: string; max?: string };
  getRowKey: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
  onPageChange: (page: number) => void;
  onItemClick?: (item: T) => void;
} & DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function Grid<T = Record<string, any>>({
  data = [],
  page = 1,
  total,
  limit = 10,
  className,
  gap = 16,
  rowHeight,
  columnWidth,
  getRowKey,
  renderItem,
  onItemClick,
  onPageChange,
  ...props
}: GridProps<T>) {
  return (
    <div className={classNames('grid', className)} {...props}>
      <div
        className="grid__content"
        style={{
          gap,
          gridTemplateRows: `repeat(auto-fill, minmax(${rowHeight?.min || '250px'}, ${rowHeight?.max || '300px'}))`,
          gridTemplateColumns: `repeat(auto-fill, minmax(${columnWidth?.min || '250px'}, ${columnWidth?.max || '1fr'}))`,
        }}
      >
        {data.map((item) => (
          <GridCard key={getRowKey(item)} onClick={() => onItemClick?.(item)}>
            {renderItem(item)}
          </GridCard>
        ))}
      </div>

      <Pagination page={page} total={total} limit={limit} onPageChange={onPageChange} />
    </div>
  );
}

export default memo(Grid) as <T>(props: GridProps<T>) => JSX.Element;
