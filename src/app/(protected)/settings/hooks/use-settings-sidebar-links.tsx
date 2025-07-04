import { MdContactPage, MdWorkOutline } from 'react-icons/md';
import { useIntl } from 'react-intl';

import { Routes } from '@/app/router';
import { SidebarNavProps } from '@/shared/ui/navigation/sidebar/components/sidebar-nav';

export const useSettingsSidebarLinks = () => {
  const { formatMessage } = useIntl();

  const settingsSidebarLinks: SidebarNavProps[] = [
    {
      title: formatMessage({ id: 'settings.sidebar.title' }),
      links: [
        {
          title: formatMessage({ id: 'settings.sidebar.account' }),
          to: Routes.SETTINGS_ACCOUNT,
          icon: MdContactPage,
        },
        {
          title: formatMessage({ id: 'settings.sidebar.language' }),
          to: Routes.SETTINGS_LANGUAGE,
          icon: MdWorkOutline,
        },
      ],
    },
  ];

  return { settingsSidebarLinks };
};
