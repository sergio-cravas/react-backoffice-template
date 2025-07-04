import { useMemo } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useProfile } from '@/features/auth/hooks/use-profile';
import { hasPerm } from '@/features/auth/utils/has-perm';
import useScreenSize from '@/shared/hooks/use-screen-size';
import { Logo } from '@/shared/ui/core/logo';

import { SidebarNav, type SidebarNavProps } from './components/sidebar-nav';
import { SidebarToggleButton } from './components/sidebar-toggle-button';
import { useSidebarLinks } from './hooks/use-sidebar-links';
import { useToggleSidebar } from './hooks/use-toggle-sidebar';

import './sidebar.scss';

type SidebarProps = {
  className?: string;
  links?: SidebarNavProps[];
  withLogo?: boolean;
  isCollapsed?: boolean;
  allowsCollapse?: boolean;
};

function Sidebar({ className, links, withLogo = false, isCollapsed = false, allowsCollapse = false }: SidebarProps) {
  const { me } = useProfile();
  const { sidebarLinks } = useSidebarLinks();
  const { isLessOrEqualThan } = useScreenSize();

  const isMobile = useMemo(() => isLessOrEqualThan('sm'), [isLessOrEqualThan]);

  const { collapsed, toggleSidebar } = useToggleSidebar({ isCollapsed: isCollapsed || isMobile });

  const finalLinks = useMemo(() => links || sidebarLinks, [links, sidebarLinks]);

  const filteredLinksByPerm = useMemo(() => {
    let result = [...finalLinks];

    if (!me) return result;

    result = result
      .map((group) => {
        const filteredChildren = group.links.filter((link) => hasPerm(me.permissions, link.perm));

        if (filteredChildren.length === 0) return null;
        else return { ...group, links: filteredChildren };
      })
      .filter(Boolean) as SidebarNavProps[];

    return result;
  }, [me, finalLinks]);

  return (
    <motion.div
      className={classNames('sidebar', { 'sidebar--collapsed': collapsed }, className)}
      animate={{ width: collapsed || isMobile ? 64 : 240 }}
      transition={{ duration: 0.3 }}
    >
      {(withLogo || allowsCollapse) && (
        <div className="sidebar__logo">
          {withLogo && !collapsed && <Logo size="small" />}

          {allowsCollapse && (
            <SidebarToggleButton isCollapsed={collapsed} onClick={toggleSidebar} disabled={isMobile} />
          )}
        </div>
      )}

      {filteredLinksByPerm.map((group, index) => (
        <SidebarNav key={index} isCollapsed={collapsed} {...group} />
      ))}
    </motion.div>
  );
}

export default Sidebar;
