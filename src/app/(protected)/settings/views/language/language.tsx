import { useIntl } from 'react-intl';

import { LanguageSelect } from '@/features/lang/components/language-select';

import { SettingsSection } from '../../components/settings-section';
import { SettingsSectionItem } from '../../components/settings-section-item';

import './language.scss';

function Language() {
  const { formatMessage } = useIntl();

  return (
    <div className="language">
      <SettingsSection title={formatMessage({ id: 'settings.language.title' })}>
        <SettingsSectionItem
          title={formatMessage({ id: 'settings.language.languageSelection.title' })}
          subtitle={formatMessage({ id: 'settings.language.languageSelection.description' })}
        >
          <LanguageSelect />
        </SettingsSectionItem>
      </SettingsSection>
    </div>
  );
}

export default Language;
