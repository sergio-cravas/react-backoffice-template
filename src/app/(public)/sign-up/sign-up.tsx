import { useIntl } from 'react-intl';

import { Logo } from '@/shared/ui/core/logo';
import { Text } from '@/shared/ui/core/text';
import { SuccessMessage } from '@/shared/ui/features/auth/success-message';

import { SignUpForm } from './components/sign-up-form';

import './sign-up.scss';

function SignUp() {
  const { formatMessage } = useIntl();

  return (
    <div className="sign-up">
      <main className="sign-up__form">
        <Logo />

        <SuccessMessage
          title={formatMessage({ id: 'signUp.title' })}
          subtitle={formatMessage({ id: 'signUp.subtitle' })}
        />

        <SignUpForm />
      </main>

      <Text as="span" color="contentTertiary" className="sign-up__form-footer">
        {formatMessage({ id: 'app.footer' })}
      </Text>
    </div>
  );
}

export default SignUp;
