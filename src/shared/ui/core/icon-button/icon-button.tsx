import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { IconType } from 'react-icons';

import Icon from '../icon/icon';
import './icon-button.scss';

type IconButtonVariant = 'primary' | 'secondary' | 'outline';
type IconButtonType = 'submit' | 'reset' | 'button';
type IconButtonSize = 's' | 'm' | 'l' | 'xl';
type IconButtonShape = 'square' | 'circle';

interface IconButtonProps {
  to?: string;
  icon: IconType;
  variant?: IconButtonVariant;
  type?: IconButtonType;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export const IconButton = ({
  to,
  icon,
  variant = 'primary',
  type = 'button',
  size = 'm',
  shape = 'square',
  disabled = false,
  className,
  onClick,
}: IconButtonProps) => {
  const LinkWrapper = ({ children }: PropsWithChildren) => (to ? <Link to={to}>{children}</Link> : children);

  const iconSizes: Record<IconButtonSize, number> = { xl: 24, l: 20, m: 16, s: 14 };
  const iconVariants: Record<IconButtonVariant, React.ComponentProps<typeof Icon>['variant']> = {
    primary: 'secondary',
    secondary: 'primary',
    outline: 'primary',
  };

  return (
    <LinkWrapper>
      <button
        className={cn('icon-button', className, {
          [`icon-button--${variant}`]: !!variant,
          [`icon-button--size-${size}`]: !!size,
          [`icon-button--shape-${shape}`]: !!shape,
        })}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        <Icon as={icon} size={iconSizes[size]} variant={iconVariants[variant]} />
      </button>
    </LinkWrapper>
  );
};
