import { MdEmail } from 'react-icons/md';

import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';
import { Link } from '@/shared/ui/navigation/link';

import { Column } from '../../../types/list.types';

type ListCellEmailProps<T> = {
  row: T;
  column: Column<T>;
};

function ListCellEmail<T>({ row, column }: ListCellEmailProps<T>) {
  const data = row[column.key];

  return (
    <Link to={`mailto:${data}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon as={MdEmail} size={16} variant="tertiary" />

      <Text variant="body-m" color="contentDarkPrimary" style={{ textDecoration: 'underline' }}>
        {data}
      </Text>
    </Link>
  );
}

export default ListCellEmail;
