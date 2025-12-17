import { MdAdd } from 'react-icons/md';

import Image from '@/assets/images/empty-list-indicator-image.png';

import { Button } from '../../core/button';
import { Icon } from '../../core/icon';
import { Text } from '../../core/text';

import './empty-list-indicator.scss';

type EmptyListIndicatorProps = {
  title: string;
  message: string;
  imageSrc?: string;
  addButton?: {
    label: string;
    onClick: () => void;
  };
};

function EmptyListIndicator({ title, message, imageSrc = Image, addButton }: EmptyListIndicatorProps) {
  return (
    <div className="empty-list-indicator">
      <img className="empty-list-indicator__image" src={imageSrc} alt={title} />

      <Text variant="h4" className="empty-list-indicator__title">
        {title}
      </Text>

      <Text color="contentDarkSecondary" className="empty-list-indicator__message">
        {message}
      </Text>

      {!!addButton && (
        <Button className="empty-list-indicator__button" onClick={addButton.onClick}>
          <Icon variant="secondary" as={MdAdd} size={16} />
          {addButton.label}
        </Button>
      )}
    </div>
  );
}

export default EmptyListIndicator;
