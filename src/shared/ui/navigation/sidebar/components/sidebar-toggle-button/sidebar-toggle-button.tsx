import classNames from 'classnames';
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
      variant="tertiary"
      disabled={disabled}
      className={classNames('sidebar-toggle-button', { 'sidebar-toggle-button--collapsed': isCollapsed })}
      icon={<Icon as={isCollapsed ? LuChevronsRightLeft : LuChevronsLeftRight} size={20} variant="tertiary" />}
      onClick={onClick}
    />
  );
}

export default SidebarToggleButton;
