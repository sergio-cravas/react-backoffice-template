import { memo } from 'react';

import cn from 'classnames';

import { Option } from '@/shared/types/form.types';
import { Text } from '@/shared/ui/core/text';

import './category-button.scss';

type CategoryButtonProps = {
  category: string;
  option: Option<string>;
  onSelectCategory: (category: string) => void;
};

function CategoryButton({ category, option, onSelectCategory }: CategoryButtonProps) {
  return (
    <button
      className={cn('category-button', { 'category-button--active': option.value === category })}
      onClick={() => onSelectCategory(option.value)}
    >
      <Text
        as="span"
        variant="body-m"
        color={option.value === category ? 'contentDarkPrimary' : 'contentDarkSecondary'}
      >
        {option.label}
      </Text>
    </button>
  );
}

export default memo(CategoryButton);
