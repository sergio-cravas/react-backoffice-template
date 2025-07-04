import { useCallback, useMemo } from 'react';

import { useForm } from 'react-hook-form';

export const useDropdownFilterForm = ({ items, onApply }) => {
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

    onApply?.({});
  }, [reset, onApply]);

  const onSubmit = useCallback(
    (data) => {
      onApply?.({ ...data });
    },
    [onApply]
  );

  return {
    control,
    onClear,
    onSubmit: handleSubmit(onSubmit),
  };
};
