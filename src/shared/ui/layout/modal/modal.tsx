import { PropsWithChildren, useEffect } from 'react';

import cn from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { MdClose } from 'react-icons/md';

import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';

import './modal.scss';

const framerModalBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.125 },
};

const framerModalPanel = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

type ModalProps = PropsWithChildren<{
  title: string | React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
  closeOnEscKey?: boolean;
  closeOnOverlayClick?: boolean;
  onClose: () => void;
}>;

export const Modal = ({
  title,
  children,
  className,
  hideCloseButton,
  closeOnEscKey = false,
  closeOnOverlayClick = false,
  onClose,
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (closeOnEscKey) window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (closeOnEscKey) window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOnEscKey, onClose]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <>
        <motion.div
          key="modal-overlay"
          {...framerModalBackground}
          aria-hidden="true"
          className="modal-overlay"
          onClick={closeOnOverlayClick ? () => onClose() : undefined}
        />

        <motion.div key="modal" {...framerModalPanel} aria-label="Modal" className={cn('modal', className)}>
          <div className="modal__head">
            <Text variant="body-xl" weight="medium">
              {title}
            </Text>

            {hideCloseButton ? null : <Icon as={MdClose} size={20} onClick={onClose} />}
          </div>

          <div className="modal__body">{children}</div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};
