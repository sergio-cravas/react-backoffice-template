import { MdPhone } from 'react-icons/md';

import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';
import { Link } from '@/shared/ui/navigation/link';

import { Column } from '../../../types/list.types';

type ListCellPhoneProps<T> = {
  row: T;
  column: Column<T>;
};

function ListCellPhone<T>({ row, column }: ListCellPhoneProps<T>) {
  const data = row[column.key];

  return (
    <Link to={`tel:${data}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon as={MdPhone} size={16} variant="outline" />

      <Text variant="body-m" color="contentDarkSecondary">
        {data}
      </Text>
    </Link>
  );
}

export default ListCellPhone;
