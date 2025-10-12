import * as RouterDom from 'react-router-dom';

import cn from 'clsx';

import './link.scss';

type LinkProps = RouterDom.LinkProps & { icon?: React.ReactNode };

export const Link = ({ icon, children, ...props }: LinkProps) => {
  return (
    <RouterDom.Link {...props} className={cn('link', props.className, { 'link--with-icon': !!icon })}>
      {children}
      {icon}
    </RouterDom.Link>
  );
};
