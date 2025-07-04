import { useIntl } from 'react-intl';
import { toast } from 'sonner';

import { useProfile } from '@/features/auth/hooks/use-profile';
import { useUpdateProfile } from '@/features/auth/hooks/use-update-profile';
import { Button } from '@/shared/ui/core/button';
import { ImageInputField } from '@/shared/ui/forms/image-input-field';
import { InputField } from '@/shared/ui/forms/input-field';

import { useSettingsProfileForm } from '../../hooks/use-settings-profile-form';

import './settings-profile-form.scss';

function SettingsProfileForm() {
  const { formatMessage } = useIntl();

  const { me } = useProfile();

  const { updateProfile } = useUpdateProfile({
    onSuccess: () => toast.success(formatMessage({ id: 'common.feedback.success' })),
    onError: () => toast.error(formatMessage({ id: 'common.feedback.error' })),
  });

  const { control, onSubmit } = useSettingsProfileForm({
    defaultValues: {
      firstName: me?.firstName || '',
      lastName: me?.lastName || '',
      imageUrl: me?.imageUrl || null,
    },
    onSubmit: (data) => updateProfile(data),
  });

  return (
    <form className="settings-profile-form" onSubmit={onSubmit}>
      <ImageInputField name="imageUrl" control={control} />

      <div className="settings-profile-form__full-name">
        <InputField
          name="firstName"
          control={control}
          inputProps={{
            label: formatMessage({ id: 'settings.account.profile.firstName.label' }),
            placeholder: formatMessage({ id: 'settings.account.profile.firstName.placeholder' }),
          }}
        />

        <InputField
          name="lastName"
          control={control}
          inputProps={{
            label: formatMessage({ id: 'settings.account.profile.lastName.label' }),
            placeholder: formatMessage({ id: 'settings.account.profile.lastName.placeholder' }),
          }}
        />
      </div>

      <div className="settings-profile-form__save">
        <Button fullWidth type="submit" variant="primary" label={formatMessage({ id: 'common.form.save' })} />
      </div>
    </form>
  );
}

export default SettingsProfileForm;
