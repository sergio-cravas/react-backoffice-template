import { DetailedHTMLProps, memo, PropsWithChildren } from 'react';

import { cn } from '@/shared/utils/style.utils';

import './grid-card.scss';

type GridCardProps = PropsWithChildren<{}> & DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function GridCard({ className, children, ...props }: GridCardProps) {
  return (
    <div className={cn('grid-card', { 'grid-card--clickable': !!props.onClick }, className)} {...props}>
      {children}
    </div>
  );
}

export default memo(GridCard);
