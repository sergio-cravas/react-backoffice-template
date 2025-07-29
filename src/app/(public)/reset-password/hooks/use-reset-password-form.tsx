import { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { useYupValidationResolver } from '@/shared/hooks/use-yup-validation-resolver';

type FormData = {
  email: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

export const useResetPasswordForm = ({ onSubmit }: Props) => {
  const { formatMessage } = useIntl();

  const resolver = useYupValidationResolver(
    yup.object({
      email: yup.string().required(formatMessage({ id: 'common.form.validations.required' })),
    })
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver, defaultValues: { email: '' } });

  const handleOnSubmit = useCallback(
    (data: FormData) => {
      onSubmit(data);
    },
    [onSubmit]
  );

  return {
    errors,
    control,
    onSubmit: handleSubmit(handleOnSubmit),
  };
};
