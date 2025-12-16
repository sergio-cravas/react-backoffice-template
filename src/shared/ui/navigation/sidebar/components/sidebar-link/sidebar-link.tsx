import { NavLink } from 'react-router-dom';

import { IconType } from 'react-icons';

import { RoutePath } from '@/app/router';
import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';
import { cn } from '@/shared/utils/style.utils';

import './sidebar-link.scss';

export type SidebarLinkProps = {
  title: string;
  to: RoutePath;
  perm?: string;
  isCollapsed?: boolean;
  icon?: IconType;
};

function SidebarLink({ title, to, isCollapsed, icon }: SidebarLinkProps) {
  return (
    <li className="sidebar-link-wrapper">
      <NavLink to={to}>
        {({ isActive }) => (
          <div className={cn('sidebar-link', { 'sidebar-link--active': isActive })}>
            {!!icon && <Icon as={icon} size={20} variant="tertiary" />}

            {!isCollapsed && (
              <Text as="span" variant="body-m" weight="medium" color="contentDarkSecondary">
                {title}
              </Text>
            )}
          </div>
        )}
      </NavLink>
    </li>
  );
}

export default SidebarLink;
