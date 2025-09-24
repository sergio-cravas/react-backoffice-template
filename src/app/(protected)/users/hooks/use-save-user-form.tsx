import { useCallback, useEffect, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { User, UserRole } from '@/api/users/models/user';
import { MAX_FILE_SIZE } from '@/shared/constants/constants';
import regex from '@/shared/constants/regex';
import { useYupValidationResolver } from '@/shared/hooks/use-yup-validation-resolver';

type FormData = {
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  phone: string;
  imageUrl?: string | null;
  permissions: string[];
};

type Props = {
  user?: User;
  onSubmit: (data: FormData) => void;
};

export const useSaveUserForm = ({ user, onSubmit }: Props) => {
  const { formatMessage } = useIntl();

  const defaultValues: FormData = useMemo(() => {
    if (!user?.id)
      return {
        firstName: '',
        lastName: '',
        role: UserRole.USER,
        email: '',
        phone: '',
        imageUrl: null,
        permissions: [],
      };

    return {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      role: user.role || UserRole.USER,
      email: user.email || '',
      phone: user.phone || '',
      imageUrl: user.imageUrl || null,
      permissions: user.permissions || [],
    };
  }, [user]);

  const resolver = useYupValidationResolver(
    yup.object({
      imageUrl: yup
        .mixed<undefined | string | { base64: string | ArrayBuffer | null; name: string; file: File }>()
        .nullable()
        .test(
          'fileSize',
          formatMessage({ id: 'common.form.validations.fileTooLarge' }, { maxSize: '2MB' }),
          (value) => {
            if (value && typeof value === 'object' && 'file' in value && value.file instanceof File) {
              return value.file.size <= MAX_FILE_SIZE;
            }
            return true;
          }
        ),
      firstName: yup
        .string()
        .required(formatMessage({ id: 'common.form.validations.required' }))
        .matches(regex.onlyLettersAndSpaces, formatMessage({ id: 'common.form.validations.onlyLettersAndSpaces' })),
      lastName: yup
        .string()
        .required(formatMessage({ id: 'common.form.validations.required' }))
        .matches(regex.onlyLettersAndSpaces, formatMessage({ id: 'common.form.validations.onlyLettersAndSpaces' })),
      email: yup
        .string()
        .email(formatMessage({ id: 'common.form.validations.invalidEmail' }))
        .required(formatMessage({ id: 'common.form.validations.required' })),
      phone: yup.string().required(formatMessage({ id: 'common.form.validations.required' })),
      role: yup
        .mixed<UserRole | { label: string; value: UserRole }>()
        .test('roleType', formatMessage({ id: 'common.form.validations.invalid' }), (value) =>
          typeof value === 'string'
            ? Object.values(UserRole).includes(value as UserRole)
            : value && typeof value === 'object' && 'value' in value && Object.values(UserRole).includes(value.value)
        )
        .required(formatMessage({ id: 'common.form.validations.required' })),
    })
  );

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver, defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleOnSubmit = useCallback(
    (data: FormData) => {
      onSubmit({ ...data, role: data?.role });
    },
    [onSubmit]
  );

  return {
    errors,
    control,
    onSubmit: handleSubmit(handleOnSubmit),
  };
};
