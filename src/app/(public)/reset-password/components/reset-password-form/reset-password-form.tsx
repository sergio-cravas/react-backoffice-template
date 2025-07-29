import { useCallback } from 'react';

import { useIntl } from 'react-intl';
import { toast } from 'sonner';

import { Routes } from '@/app/router';
import { useResetPassword } from '@/features/auth/hooks/use-reset-password';
import { Button } from '@/shared/ui/core/button';
import { Text } from '@/shared/ui/core/text';
import { InputField } from '@/shared/ui/forms/input-field';
import { Link } from '@/shared/ui/navigation/link';

import { useResetPasswordForm } from '../../hooks/use-reset-password-form';

import './reset-password-form.scss';

type ResetPasswordFormProps = {
  onSuccess: () => void;
};

function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const { formatMessage } = useIntl();

  const onSubmitError = useCallback(() => {
    toast.error(formatMessage({ id: 'common.feedback.error' }));
  }, [formatMessage]);

  const { resetPassword } = useResetPassword({ onSuccess, onError: onSubmitError });
  const { control, onSubmit } = useResetPasswordForm({ onSubmit: resetPassword });

  return (
    <form className="reset-password-form" onSubmit={onSubmit}>
      <InputField
        name="email"
        control={control}
        inputProps={{
          type: 'email',
          autoComplete: 'email',
          label: formatMessage({ id: 'resetPassword.form.email.label' }),
          placeholder: formatMessage({ id: 'resetPassword.form.email.placeholder' }),
        }}
      />

      <Button
        fullWidth
        size="l"
        type="submit"
        variant="primary"
        className="reset-password-form__submit"
        label={formatMessage({ id: 'resetPassword.form.submit' })}
      />

      <Text className="reset-password-form__go-back">
        {formatMessage({ id: 'resetPassword.form.signIn.text' })}{' '}
        <Link to={Routes.SIGN_IN}>{formatMessage({ id: 'resetPassword.form.signIn.link' })}</Link>
      </Text>
    </form>
  );
}

export default ResetPasswordForm;
