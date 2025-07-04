import { Control } from 'react-hook-form';

import { SelectField } from '@/shared/ui/forms/select-field';

import { SelectItem } from '../types/dropdown-filter.types';

type Props = { control: Control<any, any>; item: SelectItem };

function SelectDropdownFilterItem({ control, item }: Props) {
  return <SelectField control={control} name={item.name} inputProps={{ ...item }} />;
}

export default SelectDropdownFilterItem;
