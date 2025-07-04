import { Option } from '@/shared/types/form.types';

type BaseItem = {
  name: string;
  label: string;
  type: 'checkbox' | 'input' | 'select';
  onChange?: (value: any) => void;
};

export type CheckboxItem = BaseItem & {
  type: 'checkbox';
  value?: boolean;

  onChange?: (value: boolean) => void;
};

export type InputItem = BaseItem & {
  type: 'input';
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export type SelectItem = BaseItem & {
  type: 'select';
  options: Option<string>[];
  value?: Option<string> | null;
  placeholder?: string;
  onChange?: (value: Option<string> | null) => void;
};

export type Item = CheckboxItem | InputItem | SelectItem;
