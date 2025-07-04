import { useEffect } from 'react';

export const usePreventFromLeaving = (showConfirm: boolean = true) => {
  useEffect(() => {
    if (!showConfirm) return;

    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }

    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [showConfirm]);

  return null;
};
