import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { Routes } from '@/app/router';

import { useAuthStore } from '../store';

export const PublicRoute = ({ redirectIfAuth, children }: PropsWithChildren<{ redirectIfAuth?: boolean }>) => {
  const { isAuth } = useAuthStore();

  if (isAuth && redirectIfAuth) {
    return <Navigate to={Routes.DASHBOARD} />;
  }

  return children;
};
