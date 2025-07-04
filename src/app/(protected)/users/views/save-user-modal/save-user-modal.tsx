import { useCallback, useMemo } from 'react';

import { useIntl } from 'react-intl';

import { UserRole } from '@/features/auth/models/user';
import { useCreateUser } from '@/features/users/hooks/use-create-user';
import { useEditUser } from '@/features/users/hooks/use-edit-user';
import { useGetUserById } from '@/features/users/hooks/use-get-user-by-id';
import { Button } from '@/shared/ui/core/button';
import { ImageInputField } from '@/shared/ui/forms/image-input-field';
import { InputField } from '@/shared/ui/forms/input-field';
import { SelectField } from '@/shared/ui/forms/select-field';
import { Modal } from '@/shared/ui/layout/modal';

import { useSaveUserForm } from '../../hooks/use-save-user-form';

import './save-user-modal.scss';

type SaveUserModalProps = {
  userId?: string;
  onClose: () => void;
};

function SaveUserModal({ userId, onClose }: SaveUserModalProps) {
  const { formatMessage } = useIntl();

  const onSuccess = useCallback(() => {
    onClose();
  }, [onClose]);

  const onCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const { user } = useGetUserById({ id: userId });
  const { editUser } = useEditUser({ onSuccess });
  const { createUser } = useCreateUser({ onSuccess });
  const { control, onSubmit } = useSaveUserForm({
    user,
    onSubmit: (body) => (userId ? editUser({ id: userId, body }) : createUser({ body })),
  });

  const title = useMemo(() => {
    if (userId) return formatMessage({ id: 'users.saveModal.editTitle' });

    return formatMessage({ id: 'users.saveModal.createTitle' });
  }, [userId, formatMessage]);

  return (
    <Modal className="save-user-modal" title={title} closeOnEscKey onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="save-user-modal__row">
          <ImageInputField name="imageUrl" control={control} />
        </div>

        <div className="save-user-modal__row">
          <InputField
            name="firstName"
            control={control}
            inputProps={{
              label: formatMessage({ id: 'users.saveModal.form.firstName.label' }),
              placeholder: formatMessage({ id: 'users.saveModal.form.firstName.placeholder' }),
            }}
          />

          <InputField
            name="lastName"
            control={control}
            inputProps={{
              label: formatMessage({ id: 'users.saveModal.form.lastName.label' }),
              placeholder: formatMessage({ id: 'users.saveModal.form.lastName.placeholder' }),
            }}
          />
        </div>

        <div className="save-user-modal__row">
          <InputField
            name="email"
            control={control}
            inputProps={{
              type: 'email',
              label: formatMessage({ id: 'users.saveModal.form.email.label' }),
              placeholder: formatMessage({ id: 'users.saveModal.form.email.placeholder' }),
            }}
          />

          <InputField
            name="phone"
            control={control}
            inputProps={{
              type: 'tel',
              label: formatMessage({ id: 'users.saveModal.form.phone.label' }),
              placeholder: formatMessage({ id: 'users.saveModal.form.phone.placeholder' }),
            }}
          />
        </div>

        <div className="save-user-modal__row">
          <SelectField
            name="role"
            control={control}
            inputProps={{
              label: formatMessage({ id: 'users.saveModal.form.role.label' }),
              placeholder: formatMessage({ id: 'users.saveModal.form.role.placeholder' }),
              options: Object.values(UserRole).map((role) => ({
                value: role,
                label: formatMessage({ id: `app.features.users.categories.${role}` }),
              })),
            }}
          />

          <div />
        </div>

        <div className="save-user-modal__row">
          <Button variant="secondary" label={formatMessage({ id: 'common.form.cancel' })} onClick={onCancel} />

          <Button type="submit" label={formatMessage({ id: 'common.form.save' })} />
        </div>
      </form>
    </Modal>
  );
}

export default SaveUserModal;
