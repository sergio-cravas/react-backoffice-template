import { memo, useCallback, useEffect, useRef, useState } from 'react';

import cn from 'clsx';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

import { Button } from '../button';
import { Icon } from '../icon';
import { MenuItem } from './components/menu-item';
import { Item } from './menu.types';

import './menu.scss';

const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.25 },
    display: 'block',
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: { duration: 0.25 },
    transitionEnd: { display: 'none' },
  },
};

export type MenuProps = {
  icon?: IconType;
  label: string;
  items: Item[];
  width?: number;
  className?: string;
};

function Menu({ icon, label, items, width, className }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onExpand = useCallback(() => {
    if (items.length === 0) return;

    setIsExpanded((prev) => !prev);
  }, [items.length]);

  const onItemClick = useCallback((item: Item) => {
    if (item.onClick) item.onClick();

    setIsExpanded(false);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  return (
    <div ref={menuRef} className={cn('menu', className)}>
      <Button variant="outline" onClick={onExpand}>
        {!!icon && <Icon as={icon} size={16} />}
        {label}
      </Button>

      <motion.div
        className="menu__dropdown"
        initial="exit"
        animate={isExpanded ? 'enter' : 'exit'}
        variants={subMenuAnimate}
        style={{ width: width ? width : '100%', left: width ? '0' : 'unset' }}
      >
        {items.map((item) => (
          <MenuItem key={item.label} item={item} onClick={() => onItemClick(item)} />
        ))}
      </motion.div>
    </div>
  );
}

export default memo(Menu);
