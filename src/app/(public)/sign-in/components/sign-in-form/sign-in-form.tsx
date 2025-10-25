import { useCallback } from 'react';

import { useIntl } from 'react-intl';
import { toast } from 'sonner';

import { useSignIn } from '@/api/auth/hooks/use-sign-in';
import { router, Routes } from '@/app/router';
import { useConfigStore } from '@/shared/store/config';
import { Button } from '@/shared/ui/core/button';
import { Text } from '@/shared/ui/core/text';
import { CheckboxField } from '@/shared/ui/forms/checkbox-field';
import { InputField } from '@/shared/ui/forms/input-field';
import { Link } from '@/shared/ui/navigation/link';

import { useSignInForm } from '../../hooks/use-sign-in-form';

import './sign-in-form.scss';

function SignInForm() {
  const { formatMessage } = useIntl();
  const { setRemember } = useConfigStore();

  const onSubmitSuccess = useCallback(() => {
    router.navigate(Routes.DASHBOARD);
  }, []);

  const onSubmitError = useCallback(
    (error) => {
      if (error?.statusCode === 401) toast.error(formatMessage({ id: 'signIn.error.invalidCredentials' }));
      else toast.error(error?.message || formatMessage({ id: 'common.feedback.error' }));
    },
    [formatMessage]
  );

  const { signIn } = useSignIn({ onSuccess: onSubmitSuccess, onError: onSubmitError });

  const handleOnSubmit = useCallback(
    (data) => {
      setRemember(data.remember);
      signIn({ email: data.email, password: data.password });
    },
    [signIn, setRemember]
  );

  const { control, onSubmit } = useSignInForm({ onSubmit: handleOnSubmit });

  return (
    <form className="sign-in-form" onSubmit={onSubmit}>
      <InputField
        name="email"
        control={control}
        inputProps={{
          type: 'email',
          autoComplete: 'email',
          label: formatMessage({ id: 'signIn.form.email.label' }),
          placeholder: formatMessage({ id: 'signIn.form.email.placeholder' }),
        }}
      />

      <InputField
        name="password"
        control={control}
        inputProps={{
          type: 'password',
          autoComplete: 'current-password',
          label: formatMessage({ id: 'signIn.form.password.label' }),
          placeholder: formatMessage({ id: 'signIn.form.password.placeholder' }),
        }}
      />

      <div className="sign-in-form__row">
        <CheckboxField
          name="remember"
          control={control}
          inputProps={{
            label: formatMessage({ id: 'signIn.form.remember.label' }),
          }}
        />

        <Link to={Routes.RESET_PASSWORD}>{formatMessage({ id: 'signIn.form.forgotPassword.link' })}</Link>
      </div>

      <Button
        fullWidth
        size="l"
        type="submit"
        variant="primary"
        className="sign-in-form__submit"
        label={formatMessage({ id: 'signIn.form.submit' })}
      />

      <Text className="sign-in-form__sign-up">
        {formatMessage({ id: 'signIn.form.signUp.text' })}{' '}
        <Link to={Routes.SIGN_UP}>{formatMessage({ id: 'signIn.form.signUp.link' })}</Link>
      </Text>
    </form>
  );
}

export default SignInForm;
