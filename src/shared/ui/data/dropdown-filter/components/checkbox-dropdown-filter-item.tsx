import { Control } from 'react-hook-form';

import { CheckboxField } from '@/shared/ui/forms/checkbox-field';

import { CheckboxItem } from '../types/dropdown-filter.types';

type Props = { control: Control<any, any>; item: CheckboxItem };

function CheckboxDropdownFilterItem({ control, item }: Props) {
  const { type, value, ...inputProps } = item;
  return <CheckboxField control={control} name={item.name} inputProps={inputProps} />;
}

export default CheckboxDropdownFilterItem;
