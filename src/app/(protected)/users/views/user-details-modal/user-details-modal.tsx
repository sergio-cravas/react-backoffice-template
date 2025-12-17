import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BriefcaseBusiness, Mail, Pencil, Phone } from 'lucide-react';
import { useIntl } from 'react-intl';

import { useGetUserById } from '@/api/users/hooks/use-get-user-by-id';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/core/avatar';
import { Button } from '@/shared/ui/core/button';
import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';
import { Modal } from '@/shared/ui/layout/modal';

import { UserRoleBadge } from '../../components/user-role-badge';

import './user-details-modal.scss';

type UserDetailsModalProps = {
  userId?: string;
  onClose: () => void;
};

function UserDetailsModal({ userId, onClose }: UserDetailsModalProps) {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const { user } = useGetUserById({ id: userId });

  const handleOnEdit = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('edit', 'true');

    navigate({ search: `?${params.toString()}` }, { replace: true });
  }, [navigate]);

  return (
    <Modal
      className="user-details-modal"
      title={formatMessage({ id: 'users.detailModal.detailTitle' })}
      closeOnEscKey
      onClose={onClose}
    >
      <section className="user-details-modal__content">
        <div className="user-details-modal__column">
          <div className="user-details-modal__avatar-container">
            <Avatar className="size-24">
              <AvatarImage src={user?.imageUrl} alt={user?.firstName || 'User'} />
              <AvatarFallback>{user?.firstName?.substring(0, 2)}</AvatarFallback>
            </Avatar>

            <Text variant="body-xl">
              {user?.firstName} {user?.lastName}
            </Text>
          </div>

          <div className="user-details-modal__actions">
            <div className="user-details-modal__action-item">
              <Button asChild size="icon-lg" variant="outline" aria-label="Open user phone" disabled={!user?.phone}>
                <Link to={`tel:${user?.phone}`}>
                  <Icon as={Phone} size={20} variant="outline" />
                </Link>
              </Button>

              <Text color="contentDarkSecondary">{formatMessage({ id: 'users.detailModal.call' })}</Text>
            </div>

            <div className="user-details-modal__action-item">
              <Button asChild size="icon-lg" variant="outline" aria-label="Open user email" disabled={!user?.email}>
                <Link to={`mailto:${user?.email}`}>
                  <Icon as={Mail} size={20} variant="outline" />
                </Link>
              </Button>

              <Text color="contentDarkSecondary">{formatMessage({ id: 'users.detailModal.email' })}</Text>
            </div>

            <div className="user-details-modal__action-item">
              <Button size="icon-lg" variant="outline" onClick={handleOnEdit}>
                <Icon as={Pencil} size={20} variant="outline" />
              </Button>

              <Text color="contentDarkSecondary">{formatMessage({ id: 'users.detailModal.edit' })}</Text>
            </div>
          </div>
        </div>

        <div className="user-details-modal__column">
          <div className="user-details-modal__account-information">
            <Text as="h5" variant="body-l" weight="bold">
              {formatMessage({ id: 'users.detailModal.accountInformation' })}
            </Text>

            <div className="user-details-modal__account-information__row">
              <Icon as={Mail} size={20} variant="outline" />

              <Text color="contentDarkSecondary">{user?.email}</Text>
            </div>

            <div className="user-details-modal__account-information__row">
              <Icon as={Phone} size={20} variant="outline" />

              <Text color="contentDarkSecondary">{user?.phone}</Text>
            </div>

            <div className="user-details-modal__account-information__row">
              <Icon as={BriefcaseBusiness} size={20} variant="outline" />

              <UserRoleBadge role={user?.role} />
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}

export default UserDetailsModal;
