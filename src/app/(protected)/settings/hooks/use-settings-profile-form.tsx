import { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { useYupValidationResolver } from '@/shared/hooks/use-yup-validation-resolver';

type FormData = {
  firstName: string;
  lastName: string;
  imageUrl?: string | null;
};

type Props = {
  defaultValues?: FormData;
  onSubmit: (data: FormData) => void;
};

export const useSettingsProfileForm = ({ defaultValues = { firstName: '', lastName: '' }, onSubmit }: Props) => {
  const { formatMessage } = useIntl();

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const resolver = useYupValidationResolver(
    yup.object({
      imageUrl: yup
        .mixed<undefined | string | { base64: string | ArrayBuffer | null; name: string; file: File }>()
        .nullable()
        .test('fileSize', formatMessage({ id: 'common.form.fileTooLarge' }, { maxSize: '2MB' }), (value) => {
          if (value && typeof value === 'object' && 'file' in value && value.file instanceof File) {
            return value.file.size <= MAX_FILE_SIZE;
          }

          return true;
        }),
      firstName: yup.string().required(formatMessage({ id: 'common.form.required' })),
      lastName: yup.string().required(formatMessage({ id: 'common.form.required' })),
    })
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver, defaultValues });

  const handleOnSubmit = useCallback((data: FormData) => onSubmit(data), [onSubmit]);

  return {
    errors,
    control,
    onSubmit: handleSubmit(handleOnSubmit),
  };
};
