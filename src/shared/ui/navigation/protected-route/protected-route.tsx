import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { Routes } from '@/app/router';
import { useAuthStore } from '@/shared/store/auth';

import './protected-route.scss';

type ProtectedRouteProps = PropsWithChildren<{}>;

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return <Navigate to={Routes.SIGN_IN} />;
  }

  return children;
}

export default ProtectedRoute;
