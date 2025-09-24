import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIntl } from 'react-intl';

import { useGetUsers } from '@/api/users/hooks/use-get-users';
import { User } from '@/api/users/models/user';
import { Routes } from '@/app/router';
import { useUsersStore } from '@/shared/store/users';
import Grid from '@/shared/ui/data/grid/grid';
import { EmptyListIndicator } from '@/shared/ui/layout/empty-list-indicator';

import { UserGridCard } from '../../components/user-grid-card';

import './users-grid.scss';

function UsersGrid() {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const { sortBy, filter, category, pagination, changePage } = useUsersStore();

  const { users, isLoading } = useGetUsers({
    page: pagination.page,
    limit: pagination.limit,
    sortBy,
    role: category,
    ...(filter || {}),
  });

  const getRowKey = useCallback((user: User) => user.id, []);
  const handleRowClick = useCallback((user: User) => navigate(`/users/${user.id}`), [navigate]);

  if (!isLoading && !users?.totalCount) {
    return (
      <div className="users-grid__empty-state">
        <EmptyListIndicator
          title={formatMessage({ id: 'users.emptyState.title' })}
          message={formatMessage({ id: 'users.emptyState.message' })}
          addButton={{
            label: formatMessage({ id: 'users.add' }),
            onClick: () => navigate(`${Routes.USERS}/new`),
          }}
        />
      </div>
    );
  }

  return (
    <Grid<User>
      data={users?.list}
      page={pagination.page}
      limit={pagination.limit}
      total={users?.totalCount}
      rowHeight={{ max: '250px' }}
      getRowKey={getRowKey}
      onPageChange={changePage}
      onItemClick={handleRowClick}
      renderItem={(item) => (
        <UserGridCard
          fullName={item.firstName + ' ' + item.lastName}
          role={item.role}
          email={item.email}
          phone={item.phone}
          imageUrl={item.imageUrl}
        />
      )}
    />
  );
}

export default UsersGrid;
