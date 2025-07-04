import React, { useCallback, useMemo } from 'react';

import cn from 'classnames';
import { IconBaseProps, IconType } from 'react-icons';

import './icon.scss';

type IconVariant = 'primary' | 'secondary' | 'tertiary' | 'outline';

type IconProps = Omit<IconBaseProps, 'spin'> & {
  as: IconType;
  spin?: boolean;
  variant?: IconVariant;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

function Icon({ as, className, variant = 'primary', spin, disabled, onClick, style = {}, ...props }: IconProps) {
  const IconComponent = as;

  const iconStyle = useMemo(
    () => ({
      ...(props.size ? { minWidth: props.size, minHeight: props.size } : {}),
      ...style,
    }),
    [props.size, style]
  );

  const buttonStyle = useMemo(
    () => ({
      ...(props.size ? { width: props.size, height: props.size, minWidth: props.size, minHeight: props.size } : {}),
    }),
    [props.size]
  );

  const ButtonWrapper = useCallback(
    ({ children }) =>
      onClick ? (
        <button
          className={cn('icon-button-wrapper', className)}
          style={buttonStyle}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        children
      ),
    [buttonStyle, className, disabled, onClick]
  );

  return (
    <ButtonWrapper>
      <IconComponent
        className={cn('icon', {
          'icon--disabled': !!disabled,
          'icon--spin': spin,

          [`icon--${variant}`]: !!variant,
        })}
        style={iconStyle}
        {...props}
      />
    </ButtonWrapper>
  );
}

export default Icon;
