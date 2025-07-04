import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/shared/ui/navigation/sidebar';

import './_layout.scss';

function ProtectedPagesLayout() {
  return (
    <div className="protected-page">
      <Sidebar withLogo allowsCollapse />

      <Outlet />
    </div>
  );
}

export default ProtectedPagesLayout;
