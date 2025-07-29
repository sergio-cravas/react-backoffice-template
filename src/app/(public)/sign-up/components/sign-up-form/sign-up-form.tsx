import { useIntl } from 'react-intl';
import { toast } from 'sonner';

import { router, Routes } from '@/app/router';
import { useSignUp } from '@/features/auth/hooks/use-sign-up';
import { Button } from '@/shared/ui/core/button';
import { Text } from '@/shared/ui/core/text';
import { CheckboxField } from '@/shared/ui/forms/checkbox-field';
import { InputField } from '@/shared/ui/forms/input-field';
import { Link } from '@/shared/ui/navigation/link';

import { useSignUpForm } from '../../hooks/use-sign-up-form';

import './sign-up-form.scss';

function SignUpForm() {
  const { formatMessage } = useIntl();

  const onSubmitSuccess = () => {
    router.navigate(Routes.DASHBOARD);
  };

  const onSubmitError = () => {
    toast.error(formatMessage({ id: 'common.feedback.error' }));
  };

  const { signUp } = useSignUp({ onSuccess: onSubmitSuccess, onError: onSubmitError });
  const { control, onSubmit } = useSignUpForm({ onSubmit: signUp });

  return (
    <form className="sign-up-form" onSubmit={onSubmit}>
      <div className="sign-up-form__row">
        <InputField
          name="firstName"
          control={control}
          inputProps={{
            autoComplete: 'given-name',
            label: formatMessage({ id: 'signUp.form.firstName.label' }),
            placeholder: formatMessage({ id: 'signUp.form.firstName.placeholder' }),
          }}
        />

        <InputField
          name="lastName"
          control={control}
          inputProps={{
            autoComplete: 'family-name',
            label: formatMessage({ id: 'signUp.form.lastName.label' }),
            placeholder: formatMessage({ id: 'signUp.form.lastName.placeholder' }),
          }}
        />
      </div>

      <InputField
        name="email"
        control={control}
        inputProps={{
          type: 'email',
          autoComplete: 'email',
          label: formatMessage({ id: 'signUp.form.email.label' }),
          placeholder: formatMessage({ id: 'signUp.form.email.placeholder' }),
        }}
      />

      <div className="sign-up-form__row">
        <InputField
          name="password"
          control={control}
          inputProps={{
            type: 'password',
            autoComplete: 'new-password',
            label: formatMessage({ id: 'signUp.form.password.label' }),
            placeholder: formatMessage({ id: 'signUp.form.password.placeholder' }),
          }}
        />

        <InputField
          name="confirmPassword"
          control={control}
          inputProps={{
            type: 'password',
            autoComplete: 'new-password',
            label: formatMessage({ id: 'signUp.form.confirmPassword.label' }),
            placeholder: formatMessage({ id: 'signUp.form.confirmPassword.placeholder' }),
          }}
        />
      </div>

      <div className="sign-up-form__row">
        <CheckboxField
          name="termsAndConditions"
          control={control}
          inputProps={{
            label: formatMessage(
              { id: 'signUp.form.termsAndConditions.label' },
              {
                terms: (
                  <Link to="#" className="sign-up-form__terms-link" onClick={(e) => e.stopPropagation()}>
                    {formatMessage({ id: 'signUp.form.termsAndConditions.terms' })}
                  </Link>
                ),
                privacy: (
                  <Link to="#" className="sign-up-form__privacy-link" onClick={(e) => e.stopPropagation()}>
                    {formatMessage({ id: 'signUp.form.termsAndConditions.privacy' })}
                  </Link>
                ),
              }
            ),
          }}
        />
      </div>

      <Button
        fullWidth
        size="l"
        type="submit"
        variant="primary"
        className="sign-up-form__submit"
        label={formatMessage({ id: 'signUp.form.submit' })}
      />

      <Text className="sign-up-form__sign-up">
        {formatMessage({ id: 'signUp.form.signIn.text' })}{' '}
        <Link to={Routes.SIGN_IN}>{formatMessage({ id: 'signUp.form.signIn.link' })}</Link>
      </Text>
    </form>
  );
}

export default SignUpForm;
