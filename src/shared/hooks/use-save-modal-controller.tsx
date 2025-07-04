import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { NEW_ROUTE_KEY } from '../constants/constants';

type Props = {
  paramId: string;
  redirectPath: string;
};

export const useSaveModalController = ({ paramId, redirectPath }: Props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();

  const [visible, setVisible] = useState<boolean>(false);

  const entityId = useMemo(() => params[paramId], [params, paramId]);

  const mode = useMemo(
    () => (entityId === NEW_ROUTE_KEY || search.includes('edit=true') ? 'save' : 'details'),
    [search, entityId]
  );

  const realEntityId = useMemo(
    () => (entityId !== undefined && entityId !== NEW_ROUTE_KEY ? entityId : undefined),
    [entityId]
  );

  const onClose = useCallback(() => {
    setVisible(false);

    navigate({ pathname: redirectPath, search });
  }, [search, redirectPath, navigate]);

  useEffect(() => setVisible(!!entityId), [entityId]);

  return { visible, mode, entityId: realEntityId, onClose };
};
