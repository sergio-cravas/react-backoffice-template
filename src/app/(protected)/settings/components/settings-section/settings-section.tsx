import { PropsWithChildren } from 'react';

import { SettingsSectionTitle } from '../settings-section-title';

import './settings-section.scss';

type SettingsSectionProps = PropsWithChildren<{
  title: string;
}>;

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <div className="settings-section">
      <SettingsSectionTitle title={title} />

      {children}
    </div>
  );
}

export default SettingsSection;
