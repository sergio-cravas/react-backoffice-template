import { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIntl } from 'react-intl';

import { User } from '@/features/auth/models/user';
import { useGetUsers } from '@/features/users/hooks/use-get-users';
import { useUsersStore } from '@/features/users/store';
import { SortBy } from '@/shared/types/common.types';
import { List } from '@/shared/ui/data/list';
import { Column } from '@/shared/ui/data/list/types/list.types';

import { UserNameListCell } from '../../components/user-name-list-cell';
import { UserRoleBadge } from '../../components/user-role-badge';

function UsersList() {
  const { formatMessage } = useIntl();

  const navigate = useNavigate();
  const { sortBy, filter, category, pagination, changeSortBy, changePage } = useUsersStore();

  const { users } = useGetUsers({
    page: pagination.page,
    limit: pagination.limit,
    sortBy,
    role: category,
    ...(filter || {}),
  });

  const getRowKey = useCallback((user: User) => user.id, []);
  const handleRowClick = useCallback((user: User) => navigate(`/users/${user.id}`), [navigate]);
  const handleOnColumnSort = useCallback((value?: SortBy) => changeSortBy(value), [changeSortBy]);

  const columns: Column<User>[] = useMemo(
    () => [
      {
        key: 'firstName',
        type: 'custom',
        sortable: true,
        label: formatMessage({ id: 'users.list.headers.name' }),
        render: (item) => (
          <UserNameListCell firstName={item.firstName} lastName={item.lastName} imageUrl={item.imageUrl} />
        ),
      },
      {
        key: 'email',
        type: 'email',
        sortable: true,
        label: formatMessage({ id: 'users.list.headers.email' }),
        width: 300,
      },
      {
        key: 'phone',
        type: 'phone',
        sortable: true,
        label: formatMessage({ id: 'users.list.headers.phone' }),
        width: 200,
      },
      {
        key: 'role',
        type: 'custom',
        sortable: true,
        label: formatMessage({ id: 'users.list.headers.role' }),
        width: 120,
        render: (item) => <UserRoleBadge role={item.role} />,
      },
      {
        key: 'createdAt',
        type: 'date',
        sortable: true,
        label: formatMessage({ id: 'users.list.headers.createdAt' }),
        width: 150,
      },
      {
        key: 'updatedAt',
        type: 'date',
        sortable: true,
        label: formatMessage({ id: 'users.list.headers.updatedAt' }),
        width: 150,
      },
    ],
    [formatMessage]
  );

  return (
    <List<User>
      data={users?.list}
      page={pagination.page}
      limit={pagination.limit}
      total={users?.totalCount}
      columns={columns}
      getRowKey={getRowKey}
      onPageChange={changePage}
      onRowClick={handleRowClick}
      onColumnSort={handleOnColumnSort}
    />
  );
}

export default memo(UsersList);
