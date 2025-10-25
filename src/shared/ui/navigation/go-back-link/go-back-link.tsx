import { Link } from 'react-router-dom';

import cn from 'clsx';
import { MdArrowBack } from 'react-icons/md';

import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';
import colors from '@/styles/exports/colors.module.scss';

import './go-back-link.scss';

type GoBackLinkProps = {
  to: string;
  className?: string;
  label?: string;
};

export const GoBackLink = ({ to, className, label = 'Volver' }: GoBackLinkProps) => {
  return (
    <Link to={to} className={cn('go-back-link', className)}>
      <Icon as={MdArrowBack} size={28} color={colors.dark} />

      <Text as="span" variant="body-m">
        {label}
      </Text>
    </Link>
  );
};
