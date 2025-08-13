import React, { PropsWithChildren, useMemo } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useIntl } from 'react-intl';

import { Icon } from '../icon';

import './button.scss';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost';
type ButtonType = 'submit' | 'reset' | 'button';
type ButtonSize = 's' | 'm' | 'l' | 'xl';

type ButtonProps = PropsWithChildren<{
  to?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  label?: string;
  onClick?: (event: React.MouseEvent) => void;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  to,
  icon,
  iconPosition = 'left',
  fullWidth,
  type = 'button',
  variant = 'primary',
  size = 'm',
  disabled = false,
  isLoading = false,
  className,
  children,
  label,
  onClick,
  ...props
}: ButtonProps) => {
  const { formatMessage } = useIntl();

  const LinkWrapper = ({ children }: PropsWithChildren) =>
    to ? (
      <Link to={to} style={{ cursor: 'pointer', ...(fullWidth && { width: '100%' }) }}>
        {children}
      </Link>
    ) : (
      children
    );

  const renderedIcon = useMemo(() => {
    if (isLoading) return <Icon spin as={AiOutlineLoading3Quarters} />;

    return icon;
  }, [isLoading, icon]);

  const renderedLabel = useMemo(() => {
    if (isLoading) return formatMessage({ id: 'common.loading' });

    return label;
  }, [isLoading, label, formatMessage]);

  return (
    <LinkWrapper>
      <button
        className={cn(
          'button',
          `button--size-${size}`,
          {
            'button--full-width': fullWidth,
            [`button--${variant}`]: !!variant,
            'button--disabled': disabled || isLoading,
          },
          className
        )}
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        {...props}
      >
        {iconPosition === 'left' && renderedIcon}

        {renderedLabel}
        {children}

        {iconPosition === 'right' && renderedIcon}
      </button>
    </LinkWrapper>
  );
};
