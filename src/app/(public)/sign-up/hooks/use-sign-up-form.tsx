import { useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import regex from '@/shared/constants/regex';
import { useYupValidationResolver } from '@/shared/hooks/use-yup-validation-resolver';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

export const useSignUpForm = ({ onSubmit }: Props) => {
  const { formatMessage } = useIntl();

  const resolver = useYupValidationResolver(
    yup.object({
      firstName: yup
        .string()
        .required(formatMessage({ id: 'common.form.validations.required' }))
        .matches(regex.onlyLettersAndSpaces, formatMessage({ id: 'common.form.validations.onlyLettersAndSpaces' })),
      lastName: yup
        .string()
        .required(formatMessage({ id: 'common.form.validations.required' }))
        .matches(regex.onlyLettersAndSpaces, formatMessage({ id: 'common.form.validations.onlyLettersAndSpaces' })),
      email: yup.string().required(formatMessage({ id: 'common.form.validations.required' })),
      password: yup.string().required(formatMessage({ id: 'common.form.validations.required' })),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], formatMessage({ id: 'signUp.form.confirmPassword.error' }))
        .required(formatMessage({ id: 'common.form.validations.required' })),
      termsAndConditions: yup.boolean().oneOf([true], formatMessage({ id: 'common.form.validations.required' })),
    })
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver, defaultValues: { termsAndConditions: false } });

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
