import { useMemo } from 'react';

import { MdContactPage, MdPieChartOutline, MdSettings } from 'react-icons/md';
import { useIntl } from 'react-intl';

import { Routes } from '@/app/router';
import { SidebarNavProps } from '@/shared/ui/navigation/sidebar/components/sidebar-nav';

export const useSidebarLinks = () => {
  const { formatMessage } = useIntl();

  const sidebarLinks: SidebarNavProps[] = useMemo(
    () => [
      {
        withTopBorder: true,
        links: [
          { to: Routes.DASHBOARD, title: formatMessage({ id: 'app.sidebar.dashboard' }), icon: MdPieChartOutline },
        ],
      },
      {
        title: formatMessage({ id: 'app.sidebar.database' }),
        withTopBorder: true,
        links: [
          {
            to: Routes.USERS,
            perm: 'users',
            title: formatMessage({ id: 'app.sidebar.database.users' }),
            icon: MdContactPage,
          },
        ],
      },
      {
        withTopBorder: true,
        fullHeight: true,
        links: [
          { to: Routes.SETTINGS_ACCOUNT, title: formatMessage({ id: 'app.sidebar.settings' }), icon: MdSettings },
        ],
      },
    ],
    [formatMessage]
  );

  return { sidebarLinks };
};
