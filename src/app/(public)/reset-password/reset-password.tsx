import { useCallback, useState } from 'react';

import { useIntl } from 'react-intl';

import { AuthHeader } from '@/features/auth/components/auth-header';
import { SuccessMessage } from '@/features/auth/components/success-message';
import { Logo } from '@/shared/ui/core/logo';
import { Text } from '@/shared/ui/core/text';

import { ResetPasswordForm } from './components/reset-password-form';

import './reset-password.scss';

function ResetPassword() {
  const { formatMessage } = useIntl();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleOnSuccess = useCallback(() => setIsSuccess(true), []);

  return (
    <div className="reset-password">
      <AuthHeader />

      <main className="reset-password__form">
        <Logo />

        {isSuccess ? (
          <SuccessMessage
            title={formatMessage({ id: 'resetPassword.success.title' })}
            subtitle={formatMessage({ id: 'resetPassword.success.subtitle' })}
          />
        ) : (
          <>
            <SuccessMessage
              title={formatMessage({ id: 'resetPassword.title' })}
              subtitle={formatMessage({ id: 'resetPassword.subtitle' })}
            />

            <ResetPasswordForm onSuccess={handleOnSuccess} />
          </>
        )}
      </main>

      <Text as="span" color="contentTertiary" className="reset-password__form-footer">
        {formatMessage({ id: 'app.footer' })}
      </Text>
    </div>
  );
}

export default ResetPassword;
