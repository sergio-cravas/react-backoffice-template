import { useState } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

import { Text } from '@/shared/ui/core/text';
import { cn } from '@/shared/utils/style.utils';

import { Item } from '../menu.types';

import './menu-item.scss';

const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.25 },
    display: 'flex',
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: { duration: 0.25 },
    transitionEnd: { display: 'none' },
  },
};

type MenuItemProps = {
  item: Item;
  onClick: () => void;
};

export const MenuItem = ({ item, onClick }: MenuItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const onItemClick = (_item: Item) => {
    _item.onClick?.();

    setIsExpanded(false);
    onClick();
  };

  const ExpandIcon = !isExpanded ? (
    <MdExpandLess size={32} className="menu-item__control__expand-icon" />
  ) : (
    <MdExpandMore size={32} className="menu-item__control__expand-icon" />
  );

  const LinkWrapper = ({ children, item: _item, ...props }) => {
    if (_item.to) {
      return (
        <Link to={_item.to} {...props}>
          {children}
        </Link>
      );
    }

    return <div {...props}>{children}</div>;
  };

  return (
    <div className="menu-item">
      <LinkWrapper item={item} className="menu-item__control" onClick={item.items ? onExpand : () => onItemClick(item)}>
        <Text
          as="span"
          weight="bold"
          className={cn('menu-item__control__label', { 'menu-item__control__label--active': item.active })}
        >
          {item.label}

          {item.items ? ExpandIcon : null}
        </Text>
      </LinkWrapper>

      {item.items ? (
        <motion.div
          className="menu-item__menu"
          initial="exit"
          animate={isExpanded ? 'enter' : 'exit'}
          variants={subMenuAnimate}
        >
          {item.items.map((subitem) => (
            <LinkWrapper
              key={subitem.label}
              item={subitem}
              className="menu-item__menu__item"
              onClick={() => onItemClick(subitem)}
            >
              <Text
                as="span"
                className={cn('menu-item__menu__item__label', {
                  'menu-item__menu__item__label--active': subitem.active,
                })}
              >
                {subitem.label}
              </Text>
            </LinkWrapper>
          ))}
        </motion.div>
      ) : null}
    </div>
  );
};
