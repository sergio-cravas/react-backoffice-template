import { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { useYupValidationResolver } from '@/shared/hooks/use-yup-validation-resolver';

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

export const useSignInForm = ({ onSubmit }: Props) => {
  const { formatMessage } = useIntl();

  const resolver = useYupValidationResolver(
    yup.object({
      email: yup.string().required(formatMessage({ id: 'common.form.validations.required' })),
      password: yup.string().required(formatMessage({ id: 'common.form.validations.required' })),
      remember: yup.boolean(),
    })
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver, defaultValues: {} });

  const handleOnSubmit = useCallback(onSubmit, [onSubmit]);

  return {
    errors,
    control,
    onSubmit: handleSubmit(handleOnSubmit),
  };
};
