import { useMemo } from 'react';

import { Contact2, PieChart, Settings } from 'lucide-react';
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
          {
            to: Routes.DASHBOARD,
            title: formatMessage({ id: 'app.sidebar.dashboard' }),
            icon: PieChart,
          },
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
            icon: Contact2,
          },
        ],
      },
      {
        withTopBorder: true,
        fullHeight: true,
        links: [
          {
            to: Routes.SETTINGS_ACCOUNT,
            title: formatMessage({ id: 'app.sidebar.settings' }),
            icon: Settings,
          },
        ],
      },
    ],
    [formatMessage]
  );

  return { sidebarLinks };
};
