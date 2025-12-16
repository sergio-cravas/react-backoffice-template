import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIntl } from 'react-intl';

import { Routes } from '@/app/router';
import { Button } from '@/shared/ui/core/button';
import { Logo } from '@/shared/ui/core/logo';
import { Text } from '@/shared/ui/core/text';
import { Link } from '@/shared/ui/navigation/link';

import './auth-header.scss';

function AuthHeader() {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const handleRedirect = useCallback(() => {
    navigate(Routes.SIGN_UP);
  }, [navigate]);

  return (
    <header className="auth-header">
      <Logo size="small" />

      <div className="auth-header__links">
        <Link to={Routes.SIGN_IN}>
          <Text variant="body-m" style={{ textDecoration: 'underline' }}>
            {formatMessage({ id: 'app.features.auth.authHeader.signIn' })}
          </Text>
        </Link>

        <Button onClick={handleRedirect}>{formatMessage({ id: 'app.features.auth.authHeader.signUp' })}</Button>
      </div>
    </header>
  );
}

export default AuthHeader;
