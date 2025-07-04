import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@/shared/ui/navigation/protected-route';
import { PublicRoute } from '@/shared/ui/navigation/public-route';

import ProtectedPagesLayout from './(protected)/_layout';
import { Dashboard } from './(protected)/dashboard';
import { Settings } from './(protected)/settings';
import { Account } from './(protected)/settings/views/account';
import { Language } from './(protected)/settings/views/language';
import { Users } from './(protected)/users';
import { ResetPassword } from './(public)/reset-password';
import { SetNewPassword } from './(public)/set-new-password';
import { SignIn } from './(public)/sign-in';
import { SignUp } from './(public)/sign-up';

export const Routes = {
  DASHBOARD: '/',
  SETTINGS: '/settings',
  SETTINGS_ACCOUNT: '/settings/account',
  SETTINGS_LANGUAGE: '/settings/language',
  USERS: '/users',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  RESET_PASSWORD: '/reset-password',
  SET_NEW_PASSWORD: '/set-new-password',
} as const;

export type RoutePath = (typeof Routes)[keyof typeof Routes];

export const router = createBrowserRouter([
  { path: Routes.SIGN_IN, element: <PublicRoute redirectIfAuth children={<SignIn />} /> },
  { path: Routes.SIGN_UP, element: <PublicRoute redirectIfAuth children={<SignUp />} /> },
  { path: Routes.RESET_PASSWORD, element: <ResetPassword /> },
  { path: Routes.SET_NEW_PASSWORD, element: <SetNewPassword /> },
  {
    path: Routes.DASHBOARD,
    element: <ProtectedRoute children={<ProtectedPagesLayout />} />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: Routes.USERS,
        children: [
          { index: true, element: <Users /> },
          { path: ':userId', element: <Users /> },
        ],
      },
      {
        path: Routes.SETTINGS,
        element: <Settings />,
        children: [
          { path: 'account', element: <Account /> },
          { path: 'language', element: <Language /> },
          { path: '', element: <Navigate to={Routes.SETTINGS_ACCOUNT} replace /> },
          { path: '*', element: <Navigate to={Routes.SETTINGS_ACCOUNT} replace /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to={Routes.DASHBOARD} replace /> },
]);
