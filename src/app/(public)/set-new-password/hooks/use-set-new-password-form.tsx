import { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { useYupValidationResolver } from '@/shared/hooks/use-yup-validation-resolver';

type FormData = {
  code: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

export const useSetNewPasswordForm = ({ onSubmit }: Props) => {
  const { formatMessage } = useIntl();

  const resolver = useYupValidationResolver(
    yup.object({
      password: yup.string().required(formatMessage({ id: 'common.form.validations.required' })),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], formatMessage({ id: 'signUp.form.confirmPassword.error' }))
        .required(formatMessage({ id: 'common.form.validations.required' })),
    })
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver, defaultValues: {} });

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
