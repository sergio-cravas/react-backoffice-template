import { NavLink } from 'react-router-dom';

import classNames from 'clsx';
import { IconType } from 'react-icons';

import { RoutePath } from '@/app/router';
import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';

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
          <div className={classNames('sidebar-link', { 'sidebar-link--active': isActive })}>
            {!!icon && <Icon as={icon} size={20} variant="outline" />}

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
