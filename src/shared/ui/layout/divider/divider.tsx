import classNames from 'clsx';

import './divider.scss';

type DividerProps = {
  vertical?: boolean;
  className?: string;
};

function Divider({ vertical = false, className }: DividerProps) {
  return <div className={classNames('divider', { 'divider--vertical': vertical }, className)} />;
}

export default Divider;
