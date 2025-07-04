import { Control } from 'react-hook-form';

import { InputField } from '@/shared/ui/forms/input-field';

import { InputItem } from '../types/dropdown-filter.types';

type Props = { control: Control<any, any>; item: InputItem };

function InputDropdownFilterItem({ control, item }: Props) {
  return <InputField control={control} name={item.name} inputProps={{ ...item }} />;
}

export default InputDropdownFilterItem;
