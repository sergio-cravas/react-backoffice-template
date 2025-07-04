import { MdOutlineMail, MdOutlinePhone } from 'react-icons/md';
import { useIntl } from 'react-intl';

import { UserRole } from '@/features/auth/models/user';
import { Avatar } from '@/shared/ui/core/avatar';
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
        <Avatar src={imageUrl} alt={`Avatar ${fullName}`} />

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
        <Button
          fullWidth
          to={'tel:' + phone}
          variant="outline"
          label={formatMessage({ id: 'users.grid.card.actions.call' })}
          icon={<Icon as={MdOutlinePhone} size={16} />}
        />

        <Button
          fullWidth
          to={'mailto:' + email}
          variant="outline"
          label={formatMessage({ id: 'users.grid.card.actions.mail' })}
          icon={<Icon as={MdOutlineMail} size={16} />}
        />
      </section>
    </article>
  );
}

export default UserGridCard;
