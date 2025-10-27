import { Outlet } from 'react-router-dom';

import { LayoutHeader } from '@/shared/ui/layout/layout-header';
import { Sidebar } from '@/shared/ui/navigation/sidebar';

import './_layout.scss';

function ProtectedPagesLayout() {
  return (
    <div className="protected-page">
      <Sidebar withLogo allowsCollapse />

      <div className="protected-page__content">
        <LayoutHeader onClick={console.log} />

        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedPagesLayout;
