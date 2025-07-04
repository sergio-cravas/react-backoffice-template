import { useMemo } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { UserRole } from '@/features/auth/models/user';
import colors from '@/shared/styles/colors.module.scss';
import { Text } from '@/shared/ui/core/text';

import './user-role-badge.scss';

type UserRoleBadgeProps = {
  role: UserRole;
  width?: 'full' | 'fit-content';
};

function UserRoleBadge({ role, width = 'full' }: UserRoleBadgeProps) {
  const { formatMessage } = useIntl();

  const colorByRole: Record<UserRole, string> = useMemo(
    () => ({
      [UserRole.ADMIN]: 'Purple',
      [UserRole.USER]: 'Blue',
      [UserRole.GUEST]: 'Orange',
    }),
    []
  );

  return (
    <div
      className={classNames('user-role-badge', `user-role-badge--${width}`)}
      style={{ backgroundColor: colors[`background${colorByRole[role]}`] }}
    >
      <Text as="span" variant="body-s" weight="medium" color={`interaction${colorByRole[role]}Base`}>
        {formatMessage({ id: `app.features.users.categories.${role}` })}
      </Text>
    </div>
  );
}

export default UserRoleBadge;
