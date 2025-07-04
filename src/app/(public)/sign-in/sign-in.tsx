import { useIntl } from 'react-intl';

import { SuccessMessage } from '@/features/auth/components/success-message';
import { Logo } from '@/shared/ui/core/logo';
import { Text } from '@/shared/ui/core/text';

import { SignInForm } from './components/sign-in-form';

import './sign-in.scss';

function SignIn() {
  const { formatMessage } = useIntl();

  return (
    <div className="sign-in">
      <main className="sign-in__form">
        <Logo />

        <SuccessMessage
          title={formatMessage({ id: 'signIn.title' })}
          subtitle={formatMessage({ id: 'signIn.subtitle' })}
        />

        <SignInForm />
      </main>

      <Text as="span" color="contentTertiary" className="sign-in__form-footer">
        {formatMessage({ id: 'app.footer' })}
      </Text>
    </div>
  );
}

export default SignIn;
