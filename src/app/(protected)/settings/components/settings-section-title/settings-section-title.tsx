import { Text } from '@/shared/ui/core/text';
import { Divider } from '@/shared/ui/layout/divider';

import './settings-section-title.scss';

type SettingsSectionTitleProps = {
  title: string;
};

function SettingsSectionTitle({ title }: SettingsSectionTitleProps) {
  return (
    <div className="settings-section-title">
      <Text as="h2" variant="h6">
        {title}
      </Text>

      <Divider />
    </div>
  );
}

export default SettingsSectionTitle;
