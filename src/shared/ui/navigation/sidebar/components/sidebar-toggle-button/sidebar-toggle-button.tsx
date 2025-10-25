import classNames from 'clsx';
import { LuChevronsLeftRight, LuChevronsRightLeft } from 'react-icons/lu';

import { Button } from '@/shared/ui/core/button';
import { Icon } from '@/shared/ui/core/icon';

import './sidebar-toggle-button.scss';

type Props = {
  disabled?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
};

function SidebarToggleButton({ disabled, isCollapsed, onClick }: Props) {
  return (
    <Button
      size="icon"
      variant="secondary"
      disabled={disabled}
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className={classNames('sidebar-toggle-button', { 'sidebar-toggle-button--collapsed': isCollapsed })}
      onClick={onClick}
    >
      <Icon as={isCollapsed ? LuChevronsRightLeft : LuChevronsLeftRight} size={20} variant="tertiary" />
    </Button>
  );
}

export default SidebarToggleButton;
