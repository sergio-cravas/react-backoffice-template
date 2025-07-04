import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIntl } from 'react-intl';

import { Routes } from '@/app/router';
import { UserPageView } from '@/features/auth/models/user';
import { useUserPageCategories } from '@/features/users/hooks/use-user-page-categories';
import { useUserPageView } from '@/features/users/hooks/use-user-page-views';
import { useUsersStore } from '@/features/users/store';
import { useSaveModalController } from '@/shared/hooks/use-save-modal-controller';
import { SectionCategories } from '@/shared/ui/layout/section-categories';
import { SectionHeader } from '@/shared/ui/layout/section-header';

import { SaveUserModal } from './views/save-user-modal';
import { UserDetailsModal } from './views/user-details-modal';
import { UsersGrid } from './views/users-grid';
import { UsersList } from './views/users-list';

import './users.scss';

function Users() {
  const { formatMessage } = useIntl();

  const navigate = useNavigate();

  const { views } = useUserPageView();
  const { categories } = useUserPageCategories();
  const { view, category, changeView, changeCategory, changeFilters } = useUsersStore();

  const { mode, visible, entityId, onClose } = useSaveModalController({
    paramId: 'userId',
    redirectPath: Routes.USERS,
  });

  const renderContentByView = useCallback(() => {
    if (view === UserPageView.LIST) return <UsersList />;
    if (view === UserPageView.GRID) return <UsersGrid />;

    return <></>;
  }, [view]);

  return (
    <div className="users-page">
      {mode === 'save' && visible && <SaveUserModal userId={entityId} onClose={onClose} />}
      {mode === 'details' && visible && <UserDetailsModal userId={entityId} onClose={onClose} />}

      <SectionHeader
        title={formatMessage({ id: 'users.title' })}
        views={{ view, options: views, onChange: changeView }}
        filter={{
          items: [
            {
              type: 'input',
              name: 'name',
              label: formatMessage({ id: 'users.list.filter.name.label' }),
              placeholder: formatMessage({ id: 'users.list.filter.name.placeholder' }),
            },
            {
              type: 'checkbox',
              name: 'isDeleted',
              label: formatMessage({ id: 'users.list.filter.isDeleted.label' }),
            },
          ],
          onApply: changeFilters,
        }}
        add={{ label: formatMessage({ id: 'users.add' }), onClick: () => navigate(`${Routes.USERS}/new`) }}
      />

      <SectionCategories category={category} categories={categories} onSelectCategory={changeCategory} />

      <div className="users-page__content">{renderContentByView()}</div>
    </div>
  );
}

export default Users;
