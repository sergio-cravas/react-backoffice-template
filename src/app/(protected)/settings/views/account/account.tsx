import { useIntl } from 'react-intl';
import { toast } from 'sonner';

import { useAuth } from '@/api/auth/hooks/use-auth';
import { useProfile } from '@/api/auth/hooks/use-profile';
import { Button } from '@/shared/ui/core/button';
import { Input } from '@/shared/ui/core/input';

import SettingsProfileForm from '../../components/settings-profile-form/settings-profile-form';
import { SettingsSection } from '../../components/settings-section';
import { SettingsSectionItem } from '../../components/settings-section-item';

import './account.scss';

function Account() {
  const { formatMessage } = useIntl();

  const { me } = useProfile();
  const { logout } = useAuth();

  return (
    <div className="account">
      <SettingsSection title={formatMessage({ id: 'settings.account.profile.title' })}>
        <SettingsProfileForm />
      </SettingsSection>

      <SettingsSection title={formatMessage({ id: 'settings.account.security.title' })}>
        <SettingsSectionItem
          align="end"
          title={formatMessage({ id: 'settings.account.security.email.title' })}
          subtitle={<Input name="email" value={me?.email} disabled />}
        >
          <Button
            variant="secondary"
            label={formatMessage({ id: 'settings.account.security.email.button' })}
            onClick={() => toast.message('This feature is not implemented yet.')}
          />
        </SettingsSectionItem>

        <SettingsSectionItem
          align="end"
          title={formatMessage({ id: 'settings.account.security.password.title' })}
          subtitle={<Input name="password" value="*******" type="password" disabled />}
        >
          <Button
            variant="secondary"
            label={formatMessage({ id: 'settings.account.security.password.button' })}
            onClick={() => toast.message('This feature is not implemented yet.')}
          />
        </SettingsSectionItem>
      </SettingsSection>

      <SettingsSection title={formatMessage({ id: 'settings.account.support.title' })}>
        <SettingsSectionItem
          title={formatMessage({ id: 'settings.account.support.logout.title' })}
          subtitle={formatMessage({ id: 'settings.account.support.logout.description' })}
        >
          <Button
            variant="secondary"
            label={formatMessage({ id: 'settings.account.support.logout.button' })}
            onClick={logout}
          />
        </SettingsSectionItem>

        <SettingsSectionItem
          titleColor="contentDarkError"
          title={formatMessage({ id: 'settings.account.support.deleteAccount.title' })}
          subtitle={formatMessage({ id: 'settings.account.support.deleteAccount.description' })}
        >
          <Button
            variant="secondary"
            label={formatMessage({ id: 'settings.account.support.deleteAccount.button' })}
            onClick={() => toast.message('This feature is not implemented yet.')}
          />
        </SettingsSectionItem>
      </SettingsSection>
    </div>
  );
}

export default Account;
