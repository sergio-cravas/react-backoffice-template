import { Outlet } from 'react-router-dom';

import { useIntl } from 'react-intl';

import { SectionHeader } from '@/shared/ui/layout/section-header';
import { Sidebar } from '@/shared/ui/navigation/sidebar';

import { useSettingsSidebarLinks } from './hooks/use-settings-sidebar-links';

import './settings.scss';

function Settings() {
  const { formatMessage } = useIntl();

  const { settingsSidebarLinks } = useSettingsSidebarLinks();

  return (
    <div className="settings-page">
      <SectionHeader title={formatMessage({ id: 'settings.title' })} />

      <div className="settings-page__content">
        <Sidebar className="settings-page__content-sidebar" links={settingsSidebarLinks} />

        <Outlet />
      </div>
    </div>
  );
}

export default Settings;
