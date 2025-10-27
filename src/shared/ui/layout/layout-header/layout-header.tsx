import { memo } from 'react';
import { Link } from 'react-router-dom';

import { MdKeyboardCommandKey, MdSearch } from 'react-icons/md';
import { useIntl } from 'react-intl';

import { useProfile } from '@/api/auth/hooks/use-profile';
import { Routes } from '@/app/router';
import { getUserInitials } from '@/shared/utils/user.utils';

import { Avatar, AvatarFallback, AvatarImage } from '../../core/avatar';
import { Icon } from '../../core/icon';
import { Input } from '../../core/input';
import { Text } from '../../core/text';

import './layout-header.scss';

type LayoutHeaderProps = {
  onClick: any;
};

function LayoutHeader({ onClick = console.log }: LayoutHeaderProps) {
  const { formatMessage } = useIntl();

  const { me } = useProfile();

  return (
    <div className="layout-header">
      <div className="layout-header__title">
        <Input
          name="global-search"
          width={360}
          placeholder={formatMessage({ id: 'common.filters.search' })}
          leftElement={<Icon as={MdSearch} size={20} variant="tertiary" />}
          rightElement={<Icon as={MdKeyboardCommandKey} size={20} variant="tertiary" />}
        />
      </div>

      <div className="layout-header__tabs" />

      <div className="layout-header__actions">
        <Link to={Routes.SETTINGS_ACCOUNT} className="flex cursor-pointer items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage src={me?.imageUrl} alt={me?.firstName || 'User'} />
            <AvatarFallback>{getUserInitials(me?.firstName, me?.lastName)}</AvatarFallback>
          </Avatar>

          <Text weight="medium">
            {me?.firstName} {me?.lastName?.charAt(0).toUpperCase()}.
          </Text>
        </Link>
      </div>
    </div>
  );
}

export default memo(LayoutHeader);
