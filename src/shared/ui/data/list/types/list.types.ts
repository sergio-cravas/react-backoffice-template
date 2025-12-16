type ColumnType = 'text' | 'date' | 'email' | 'phone' | 'select' | 'custom';

type SelectOption = {
  value: string;
  label: string;
};

type BaseColumn<T = Record<string, any>> = {
  key: string;
  label: string;
  type: Exclude<ColumnType, 'custom' | 'select'>;
  width?: number;
  sortable?: boolean;
  editable?: boolean;
  onSave?: (item: T, key: string, value: any) => void;
  render?: (item: T) => React.ReactNode;
};

type SelectColumn<T = Record<string, any>> = Omit<BaseColumn<T>, 'type'> & {
  type: 'select';
  options: SelectOption[];
};

type CustomColumn<T = Record<string, any>> = Omit<BaseColumn<T>, 'type' | 'render'> & {
  type: 'custom';
  render: (item: T) => React.ReactNode;
};

type Column<T = Record<string, any>> = BaseColumn<T> | SelectColumn<T> | CustomColumn<T>;

export type { Column, ColumnType, SelectOption };
