import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { Routes } from '@/app/router';

import { useAuthStore } from '../store';
import { hasPerm } from '../utils/has-perm';

type Props = PropsWithChildren<{ perm?: string; redirect?: string }>;

export const PermProtectedRoute = ({ perm, redirect = Routes.DASHBOARD, children }: Props) => {
  const { user } = useAuthStore();

  if (!!perm && !hasPerm(user?.permissions, perm)) {
    return <Navigate to={redirect} />;
  }

  return children;
};
