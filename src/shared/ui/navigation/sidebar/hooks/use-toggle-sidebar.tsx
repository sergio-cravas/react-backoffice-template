import { useEffect, useState } from 'react';

type Props = {
  isCollapsed?: boolean;
};

export const useToggleSidebar = ({ isCollapsed = false }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(isCollapsed);

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return { collapsed, toggleSidebar: () => setCollapsed((prev) => !prev) };
};
