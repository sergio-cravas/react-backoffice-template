import { Text } from '@/shared/ui/core/text';

import { Column } from '../../../types/list.types';

type ListCellTextProps<T> = {
  row: T;
  column: Column<T>;
};

function ListCellText<T>({ row, column }: ListCellTextProps<T>) {
  const data = row[column.key];

  return (
    <Text variant="body-m" color="contentDarkSecondary">
      {data}
    </Text>
  );
}

export default ListCellText;
