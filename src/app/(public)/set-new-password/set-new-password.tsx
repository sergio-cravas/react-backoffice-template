import { useCallback, useState } from 'react';

import { useIntl } from 'react-intl';

import { Logo } from '@/shared/ui/core/logo';
import { Text } from '@/shared/ui/core/text';
import { AuthHeader } from '@/shared/ui/features/auth/auth-header';
import { SuccessMessage } from '@/shared/ui/features/auth/success-message';

import { SetNewPasswordForm } from './components/set-new-password-form';

import './set-new-password.scss';

function SetNewPassword() {
  const { formatMessage } = useIntl();

  const token = new URLSearchParams(window.location.search).get('token') || '';

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleOnSuccess = useCallback(() => setIsSuccess(true), []);

  return (
    <div className="set-new-password">
      <AuthHeader />

      <main className="set-new-password__form">
        <Logo />

        {isSuccess ? (
          <SuccessMessage
            title={formatMessage({ id: 'setNewPassword.success.title' })}
            subtitle={formatMessage({ id: 'setNewPassword.success.subtitle' })}
          />
        ) : (
          <>
            <SuccessMessage
              title={formatMessage({ id: 'setNewPassword.title' })}
              subtitle={formatMessage({ id: 'setNewPassword.subtitle' })}
            />

            <SetNewPasswordForm token={token} onSuccess={handleOnSuccess} />
          </>
        )}
      </main>

      <Text as="span" color="contentTertiary" className="set-new-password__form-footer">
        {formatMessage({ id: 'app.footer' })}
      </Text>
    </div>
  );
}

export default SetNewPassword;
