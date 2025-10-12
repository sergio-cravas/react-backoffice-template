import { memo } from 'react';

import classNames from 'clsx';

import './avatar.scss';

type AvatarProps = {
  src: string;
  alt?: string;
  size?: number;
} & React.HTMLAttributes<HTMLImageElement>;

function Avatar({ src, alt = 'User Avatar', size = 48, className, style = {}, ...props }: AvatarProps) {
  return (
    <img
      className={classNames('avatar', className)}
      src={src}
      alt={alt}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  );
}

export default memo(Avatar);
