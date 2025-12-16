import { PropsWithChildren } from 'react';

import { Text } from '@/shared/ui/core/text';
import { SidebarLink, type SidebarLinkProps } from '@/shared/ui/navigation/sidebar/components/sidebar-link';
import { cn } from '@/shared/utils/style.utils';

import './sidebar-nav.scss';

export type SidebarNavProps = PropsWithChildren<{
  title?: string;
  fullHeight?: boolean;
  isCollapsed?: boolean;
  withTopBorder?: boolean;
  links?: SidebarLinkProps[];
  orientation?: 'vertical' | 'horizontal';
}>;

function SidebarNav({
  links = [],
  title,
  fullHeight = false,
  isCollapsed = false,
  withTopBorder = false,
  orientation = 'vertical',
  children,
}: SidebarNavProps) {
  return (
    <nav
      className={cn('sidebar-nav', {
        'sidebar-nav--full-height': fullHeight,
        'sidebar-nav--with-top-border': withTopBorder,
        'sidebar-nav--horizontal': orientation === 'horizontal',
      })}
    >
      {!!title && !isCollapsed && (
        <Text as="span" variant="body-s" weight="medium" color="contentDarkSecondary" className="sidebar-nav__title">
          {title}
        </Text>
      )}

      <ul className="sidebar-nav__links">
        {links.map((link) => (
          <SidebarLink key={link.to} isCollapsed={orientation === 'vertical' && isCollapsed} {...link} />
        ))}
      </ul>

      {children}
    </nav>
  );
}

export default SidebarNav;
