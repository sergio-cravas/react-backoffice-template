import { memo } from 'react';
import { Link } from 'react-router-dom';

import cn from 'clsx';

import { Routes } from '@/app/router';
import LogoSVG from '@/assets/logo.svg';
import { useAuthStore } from '@/shared/store/auth';

import './logo.scss';

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
};

function Logo({ size, className, style }: LogoProps) {
  const { isAuth } = useAuthStore();

  return (
    <Link
      to={isAuth ? Routes.DASHBOARD : Routes.SIGN_IN}
      className={cn('logo', { [`logo--size-${size}`]: !!size }, className)}
      style={style}
    >
      <img src={LogoSVG} alt="Company logo" />
    </Link>
  );
}

export default memo(Logo);
