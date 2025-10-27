import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconType } from 'react-icons';
import { MdChevronRight } from 'react-icons/md';

import { Icon } from '@/shared/ui/core/icon';
import { Text } from '@/shared/ui/core/text';

import './kpi-card.scss';

type KpiCardProps = {
  label: string;
  title: string;
  icon: IconType;
  to?: string;
};

function KpiCard({ label, title, icon, to }: KpiCardProps) {
  const navigate = useNavigate();

  const handleOnNavigate = () => navigate(to);

  return (
    <article className="kpi-card">
      <div className="kpi-card__head">
        <div className="kpi-card__icon-wrapper">
          <Icon as={icon} size={24} variant="tertiary" />
        </div>

        {!!to && <Icon as={MdChevronRight} size={16} onClick={handleOnNavigate} />}
      </div>

      <div className="kpi-card__body">
        <Text as="span" weight="medium" color="contentDarkSecondary">
          {label}
        </Text>

        <Text as="span" variant="h4">
          {title}
        </Text>
      </div>
    </article>
  );
}

export default memo(KpiCard);
