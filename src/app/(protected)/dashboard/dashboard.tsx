import { MdContactPage } from 'react-icons/md';
import { useIntl } from 'react-intl';

import { useProfile } from '@/api/auth/hooks/use-profile';
import { useGetUsers } from '@/api/users/hooks/use-get-users';
import { Routes } from '@/app/router';
import { SectionHeader } from '@/shared/ui/layout/section-header';

import { KpiCard } from './components/kpi-card';

import './dashboard.scss';

function Dashboard() {
  const { formatMessage } = useIntl();

  const { me } = useProfile();
  const { users } = useGetUsers({ page: 1, limit: 10 });

  return (
    <div className="dashboard-page">
      <SectionHeader title={formatMessage({ id: 'dashboard.title' }, { name: me?.firstName })} />

      <div className="dashboard-page__content">
        <div className="dashboard-page__kpi-cards">
          <KpiCard
            to={Routes.USERS}
            label={formatMessage({ id: 'dashboard.kpis.users.label' })}
            title={formatMessage({ id: 'dashboard.kpis.users.title' }, { num: users?.totalCount || 0 })}
            icon={MdContactPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
