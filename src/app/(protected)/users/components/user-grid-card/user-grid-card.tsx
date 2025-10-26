import { Link } from 'react-router-dom';

import { MdOutlineMail, MdOutlinePhone } from 'react-icons/md';
import { useIntl } from 'react-intl';

import { UserRole } from '@/api/users/models/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/core/avatar';
import { Button } from '@/shared/ui/core/button';
import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';

import { UserRoleBadge } from '../user-role-badge';

import './user-grid-card.scss';

type UserGridCardProps = {
  fullName: string;
  role: UserRole;
  email: string;
  phone: string;
  imageUrl?: string;
};

function UserGridCard({ imageUrl, fullName, email, phone, role }: UserGridCardProps) {
  const { formatMessage } = useIntl();

  return (
    <article className="user-grid-card">
      <section className="user-grid-card__personal-info">
        <Avatar className="size-24">
          <AvatarImage src={imageUrl} alt={fullName || 'User'} />
          <AvatarFallback>{fullName?.substring(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="user-grid-card__personal-info-text">
          <Text variant="body-xl">{fullName}</Text>

          <UserRoleBadge role={role} width="fit-content" />
        </div>
      </section>

      <section className="user-grid-card__contact-info">
        <div className="user-grid-card__contact-info-row">
          <Icon as={MdOutlineMail} size={20} variant="outline" />
          <Text as="span" style={{ textDecoration: 'underline' }}>
            {email}
          </Text>
        </div>

        <div className="user-grid-card__contact-info-row">
          <Icon as={MdOutlinePhone} size={20} variant="outline" />
          <Text as="span" color="contentDarkSecondary">
            {phone}
          </Text>
        </div>
      </section>

      <section className="user-grid-card__actions">
        <Button asChild variant="outline">
          <Link to={'tel:' + phone}>
            <Icon as={MdOutlinePhone} size={16} />
            {formatMessage({ id: 'users.grid.card.actions.call' })}
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link to={'mailto:' + email}>
            <Icon as={MdOutlineMail} size={16} />
            {formatMessage({ id: 'users.grid.card.actions.mail' })}
          </Link>
        </Button>
      </section>
    </article>
  );
}

export default UserGridCard;
