import { useCallback, useMemo, useRef, useState } from 'react';

import { Edit2 } from 'lucide-react';

import { Option } from '@/shared/types/form.types';
import { Icon } from '@/shared/ui/core/icon';
import { Select } from '@/shared/ui/core/select';
import { Text } from '@/shared/ui/core/text';

import { Column, SelectOption } from '../../../types/list.types';

type ListCellSelectProps<T> = {
  row: T;
  column: Column<T> & { type: 'select'; options: SelectOption[] };
};

function ListCellSelect<T>({ row, column }: ListCellSelectProps<T>) {
  const data = row[column.key];

  const selectRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const displayLabel = useMemo(() => {
    const option = column.options.find((opt) => opt.value === data);
    return option?.label || data || '-';
  }, [data, column.options]);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
    setIsHovered(false);
  }, []);

  const handleChange = useCallback(
    (value: Option<string>) => {
      setIsEditing(false);

      if (column.onSave && value?.value !== data) {
        column.onSave(row, column.key, value?.value);
      }
    },
    [column, row, data]
  );

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  if (isEditing) {
    return (
      <div ref={selectRef} className="w-full">
        <Select
          name={`edit-${column.key}`}
          value={data}
          options={column.options}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div
      className="flex w-full items-center justify-between gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(event) => {
        if (column.editable) {
          event.stopPropagation();
          handleEditClick();
        }
      }}
    >
      <Text variant="body-m" color="secondary">
        {displayLabel}
      </Text>

      {column.editable && isHovered && (
        <Icon as={Edit2} size={16} variant="tertiary" className="flex-shrink-0 cursor-pointer" />
      )}
    </div>
  );
}

export default ListCellSelect;
