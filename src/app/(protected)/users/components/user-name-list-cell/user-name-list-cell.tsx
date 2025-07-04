import { Text } from '@/shared/ui/core/text';

import './user-name-list-cell.scss';

type UserNameListCellProps = {
  firstName: string;
  lastName: string;
  imageUrl: string;
};

function UserNameListCell({ firstName, lastName, imageUrl }: UserNameListCellProps) {
  return (
    <div className="user-name-list-cell">
      <img src={imageUrl} width={24} height={24} style={{ borderRadius: '100%', background: 'lightgray' }} />
      <Text>{firstName + ' ' + lastName}</Text>
    </div>
  );
}

export default UserNameListCell;
