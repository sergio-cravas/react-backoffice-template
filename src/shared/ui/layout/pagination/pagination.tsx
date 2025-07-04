import { memo, useMemo } from 'react';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Button } from '../../core/button';
import { Icon } from '../../core/icon';

import './pagination.scss';

type PaginationProps = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
};

function Pagination({ page, total, limit, onPageChange }: PaginationProps) {
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const isFirstPage = useMemo(() => page <= 1, [page]);
  const isLastPage = useMemo(() => page >= totalPages, [page, totalPages]);

  return (
    <div className="pagination">
      <div className="pagination__page-controls">
        <Button
          size="s"
          variant="secondary"
          onClick={() => onPageChange(page - 1)}
          disabled={isFirstPage}
          icon={<Icon as={MdChevronLeft} size={14} disabled={isFirstPage} />}
        />

        <div className="pagination__page-controls-pages">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={`page-${index + 1}`}
              size="s"
              variant={index + 1 === page ? 'primary' : 'tertiary'}
              onClick={() => onPageChange(index + 1)}
              label={index + 1 + ''}
            />
          ))}
        </div>

        <Button
          size="s"
          variant="secondary"
          onClick={() => onPageChange(page + 1)}
          disabled={isLastPage}
          icon={<Icon as={MdChevronRight} size={14} disabled={isLastPage} />}
        />
      </div>
    </div>
  );
}

export default memo(Pagination);
