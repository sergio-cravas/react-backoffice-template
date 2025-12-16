import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useIntl } from 'react-intl';

import { Routes } from '@/app/router';
import Isotype from '@/assets/icons/isotype.svg';
import Logotype from '@/assets/icons/logotype.svg';
import { useAuthStore } from '@/shared/store/auth';
import { cn } from '@/shared/utils/style.utils';

import './logo.scss';

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
};

function Logo({ size, className, style }: LogoProps) {
  const { isAuth } = useAuthStore();
  const { formatMessage } = useIntl();

  const src = size === 'small' ? Isotype : Logotype;

  return (
    <Link
      to={isAuth ? Routes.DASHBOARD : Routes.SIGN_IN}
      className={cn('logo', { [`logo--size-${size}`]: !!size }, className)}
      style={style}
    >
      <img src={src} alt={formatMessage({ id: 'app.name' })} />
    </Link>
  );
}

export default memo(Logo);
