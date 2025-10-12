import { DetailedHTMLProps, memo, PropsWithChildren } from 'react';

import classNames from 'clsx';

import './grid-card.scss';

type GridCardProps = PropsWithChildren<{}> & DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function GridCard({ className, children, ...props }: GridCardProps) {
  return (
    <div className={classNames('grid-card', { 'grid-card--clickable': !!props.onClick }, className)} {...props}>
      {children}
    </div>
  );
}

export default memo(GridCard);
