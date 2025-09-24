import { MdGridView, MdOutlineViewAgenda } from 'react-icons/md';
import { useIntl } from 'react-intl';

import { UserPageView } from '@/api/users/models/user';

const ViewIcons = {
  [UserPageView.GRID]: MdGridView,
  [UserPageView.LIST]: MdOutlineViewAgenda,
};

export const useUserPageView = () => {
  const { formatMessage } = useIntl();

  const views = Object.values(UserPageView).map((view) => ({
    label: formatMessage({ id: `app.features.users.views.${view}` }),
    value: view,
    icon: ViewIcons[view],
  }));

  return { views };
};
