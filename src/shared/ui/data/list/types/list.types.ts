type ColumnType = 'text' | 'date' | 'email' | 'phone' | 'custom';

type BaseColumn<T = Record<string, any>> = {
  key: string;
  label: string;
  type: Exclude<ColumnType, 'custom'>;
  width?: number;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
};

type CustomColumn<T = Record<string, any>> = Omit<BaseColumn<T>, 'type' | 'render'> & {
  type: 'custom';
  render: (item: T) => React.ReactNode;
};

type Column<T = Record<string, any>> = BaseColumn<T> | CustomColumn<T>;

export type { Column, ColumnType };
