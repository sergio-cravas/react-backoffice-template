import { cn } from '@/shared/utils/style.utils';

import './divider.scss';

type DividerProps = {
  vertical?: boolean;
  className?: string;
};

function Divider({ vertical = false, className }: DividerProps) {
  return <div className={cn('divider', { 'divider--vertical': vertical }, className)} />;
}

export default Divider;
