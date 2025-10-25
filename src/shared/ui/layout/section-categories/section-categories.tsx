import { memo } from 'react';

import { MdAdd } from 'react-icons/md';
import { useIntl } from 'react-intl';

import { Option } from '@/shared/types/form.types';

import { CategoryButton } from './components/category-button';
import { Button } from '../../core/button';
import { Icon } from '../../core/icon';

import './section-categories.scss';

type SectionCategoriesProps = {
  category?: string;
  categories: Option<string>[];
  onSelectCategory: (category: string) => void;
  onAddCategory?: () => void;
};

function SectionCategories({ category, categories, onSelectCategory, onAddCategory }: SectionCategoriesProps) {
  const { formatMessage } = useIntl();

  return (
    <div className="section-categories">
      <div className="section-categories__list">
        {categories.map((option, index) => (
          <CategoryButton key={index} option={option} category={category} onSelectCategory={onSelectCategory} />
        ))}
      </div>

      {onAddCategory && (
        <Button variant="secondary" onClick={onAddCategory}>
          <Icon as={MdAdd} size={16} />
          {formatMessage({ id: 'app.ui.layout.sectionCategories.addCategory' })}
        </Button>
      )}
    </div>
  );
}

export default memo(SectionCategories);
