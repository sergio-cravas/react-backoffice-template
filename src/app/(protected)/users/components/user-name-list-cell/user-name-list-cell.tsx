import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/core/avatar';
import { Text } from '@/shared/ui/core/text';

type UserNameListCellProps = {
  firstName: string;
  lastName: string;
  imageUrl: string;
};

function UserNameListCell({ firstName = '', lastName = '', imageUrl = '' }: UserNameListCellProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={imageUrl} alt={firstName} />
        <AvatarFallback>{firstName?.substring(0, 2)}</AvatarFallback>
      </Avatar>

      <Text as="span">{firstName + ' ' + lastName}</Text>
    </div>
  );
}

export default UserNameListCell;
