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
          size="icon"
          variant="secondary"
          disabled={isFirstPage}
          aria-label="Previous page"
          onClick={() => onPageChange(page - 1)}
        >
          <Icon as={MdChevronLeft} size={14} />
        </Button>

        <div className="pagination__page-controls-pages">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={`page-${index + 1}`}
              size="sm"
              aria-label={`Go to page ${index + 1}`}
              variant={index + 1 === page ? 'primary' : 'secondary'}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1 + ''}
            </Button>
          ))}
        </div>

        <Button
          size="icon"
          variant="secondary"
          aria-label="Next page"
          disabled={isLastPage}
          onClick={() => onPageChange(page + 1)}
        >
          <Icon as={MdChevronRight} size={14} />
        </Button>
      </div>
    </div>
  );
}

export default memo(Pagination);
