import { useIntl } from 'react-intl';

import { UserRole } from '@/features/auth/models/user';

export const useUserPageCategories = () => {
  const { formatMessage } = useIntl();

  const categories = Object.values(UserRole).map((role) => ({
    label: formatMessage({ id: `app.features.users.categories.${role}` }),
    value: role,
  }));

  return {
    categories,
  };
};
