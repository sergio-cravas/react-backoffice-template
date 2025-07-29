import { useCallback, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';

export const useDropdownFilterForm = ({ items, onApply }) => {
  const [activeFilters, setActiveFilters] = useState<number>(0);

  const defaultValues = useMemo(
    () =>
      items.reduce((acc, item) => {
        if (item.type === 'checkbox') {
          acc[item.name] = item.value || false;
        } else if (item.type === 'text' || item.type === 'select') {
          acc[item.name] = item.value || '';
        }

        return acc;
      }, {}),
    [items]
  );

  const { control, reset, handleSubmit } = useForm({ defaultValues });

  const onClear = useCallback(() => {
    reset();
    setActiveFilters(0);

    onApply?.({});
  }, [reset, onApply]);

  const onSubmit = useCallback(
    (data) => {
      setActiveFilters(Object.values(data).filter((value) => value).length);

      onApply?.({ ...data });
    },
    [onApply]
  );

  return {
    control,
    activeFilters,
    onClear,
    onSubmit: handleSubmit(onSubmit),
  };
};
