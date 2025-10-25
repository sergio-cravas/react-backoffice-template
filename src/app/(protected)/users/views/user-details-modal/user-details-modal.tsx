import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { MdOutlineCases, MdOutlineEdit, MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';
import { useIntl } from 'react-intl';

import { useGetUserById } from '@/api/users/hooks/use-get-user-by-id';
import { Avatar } from '@/shared/ui/core/avatar';
import { Icon } from '@/shared/ui/core/icon';
import { IconButton } from '@/shared/ui/core/icon-button';
import { Text } from '@/shared/ui/core/text';
import { Modal } from '@/shared/ui/layout/modal';

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
            <Avatar src={user?.imageUrl} alt={user?.firstName || 'User'} size={96} />

            <Text variant="body-xl">
              {user?.firstName} {user?.lastName}
            </Text>
          </div>

          <div className="user-details-modal__actions">
            <div className="user-details-modal__action-item">
              <IconButton
                icon={MdOutlinePhone}
                size="l"
                variant="outline"
                shape="circle"
                to={`tel:${user?.phone}`}
                disabled={!user?.phone}
              />

              <Text color="contentDarkSecondary">{formatMessage({ id: 'users.detailModal.call' })}</Text>
            </div>

            <div className="user-details-modal__action-item">
              <IconButton
                icon={MdOutlineEmail}
                size="l"
                variant="outline"
                shape="circle"
                to={`mailto:${user?.email}`}
                disabled={!user?.email}
              />

              <Text color="contentDarkSecondary">{formatMessage({ id: 'users.detailModal.email' })}</Text>
            </div>

            <div className="user-details-modal__action-item">
              <IconButton icon={MdOutlineEdit} size="l" variant="outline" shape="circle" onClick={handleOnEdit} />

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
              <Icon as={MdOutlineEmail} size={20} variant="outline" />

              <Text color="contentDarkSecondary">{user?.email}</Text>
            </div>

            <div className="user-details-modal__account-information__row">
              <Icon as={MdOutlinePhone} size={20} variant="outline" />

              <Text color="contentDarkSecondary">{user?.phone}</Text>
            </div>

            <div className="user-details-modal__account-information__row">
              <Icon as={MdOutlineCases} size={20} variant="outline" />

              <Text color="contentDarkSecondary">{user?.role}</Text>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}

export default UserDetailsModal;
