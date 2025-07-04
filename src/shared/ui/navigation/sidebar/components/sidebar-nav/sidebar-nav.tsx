import { PropsWithChildren } from 'react';

import classNames from 'classnames';

import { Text } from '@/shared/ui/core/text';
import { SidebarLink, type SidebarLinkProps } from '@/shared/ui/navigation/sidebar/components/sidebar-link';

import './sidebar-nav.scss';

export type SidebarNavProps = PropsWithChildren<{
  title?: string;
  fullHeight?: boolean;
  isCollapsed?: boolean;
  withTopBorder?: boolean;
  links?: SidebarLinkProps[];
}>;

function SidebarNav({
  links = [],
  title,
  fullHeight = false,
  isCollapsed = false,
  withTopBorder = false,
  children,
}: SidebarNavProps) {
  return (
    <nav
      className={classNames('sidebar-nav', {
        'sidebar-nav--full-height': fullHeight,
        'sidebar-nav--with-top-border': withTopBorder,
      })}
    >
      {!!title && !isCollapsed && (
        <Text as="span" variant="body-s" weight="medium" color="contentDarkSecondary" className="sidebar-nav__title">
          {title}
        </Text>
      )}

      <ul className="sidebar-nav__links">
        {links.map((link) => (
          <SidebarLink key={link.to} isCollapsed={isCollapsed} {...link} />
        ))}
      </ul>

      {children}
    </nav>
  );
}

export default SidebarNav;
