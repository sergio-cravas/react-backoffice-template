import { useCallback } from 'react';

import { useIntl } from 'react-intl';
import { toast } from 'sonner';

import { useSetNewPassword } from '@/features/auth/hooks/use-set-new-password';
import { Button } from '@/shared/ui/core/button';
import { InputField } from '@/shared/ui/forms/input-field';

import { useSetNewPasswordForm } from '../../hooks/use-set-new-password-form';

import './set-new-password-form.scss';

type SetNewPasswordFormProps = {
  token: string;
  onSuccess: () => void;
};

function SetNewPasswordForm({ token, onSuccess }: SetNewPasswordFormProps) {
  const { formatMessage } = useIntl();

  const onSubmitError = useCallback(() => {
    toast.error(formatMessage({ id: 'common.feedback.error' }));
  }, [formatMessage]);

  const { setNewPassword } = useSetNewPassword({ onSuccess, onError: onSubmitError });

  const handleOnSubmit = useCallback(
    (data: { code: string; password: string; confirmPassword: string }) => {
      setNewPassword({ token, code: data.code, password: data.password });
    },
    [setNewPassword, token]
  );

  const { control, onSubmit } = useSetNewPasswordForm({ onSubmit: handleOnSubmit });

  return (
    <form className="set-new-password-form" onSubmit={onSubmit}>
      <InputField
        name="password"
        control={control}
        inputProps={{
          type: 'password',
          autoComplete: 'new-password',
          label: formatMessage({ id: 'setNewPassword.form.password.label' }),
          placeholder: formatMessage({ id: 'setNewPassword.form.password.placeholder' }),
        }}
      />

      <InputField
        name="confirmPassword"
        control={control}
        inputProps={{
          type: 'password',
          autoComplete: 'new-password',
          label: formatMessage({ id: 'setNewPassword.form.confirmPassword.label' }),
          placeholder: formatMessage({ id: 'setNewPassword.form.confirmPassword.placeholder' }),
        }}
      />

      <Button
        fullWidth
        size="l"
        type="submit"
        variant="primary"
        className="set-new-password-form__submit"
        label={formatMessage({ id: 'setNewPassword.form.submit' })}
      />
    </form>
  );
}

export default SetNewPasswordForm;
