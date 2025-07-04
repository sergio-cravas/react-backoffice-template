import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '@/features/auth/models/user';
import { useGetUsers } from '@/features/users/hooks/use-get-users';
import { useUsersStore } from '@/features/users/store';
import Grid from '@/shared/ui/data/grid/grid';

import { UserGridCard } from '../../components/user-grid-card';

function UsersGrid() {
  const navigate = useNavigate();

  const { sortBy, filter, category, pagination, changePage } = useUsersStore();

  const { users } = useGetUsers({
    page: pagination.page,
    limit: pagination.limit,
    sortBy,
    role: category,
    ...(filter || {}),
  });

  const getRowKey = useCallback((user: User) => user.id, []);
  const handleRowClick = useCallback((user: User) => navigate(`/users/${user.id}`), [navigate]);

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
