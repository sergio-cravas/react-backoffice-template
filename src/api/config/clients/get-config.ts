import { get } from '@/api/api';

import { Config } from '../models/config';

export const getConfig = async (): Promise<Config> => {
  return get(`/config`);
};
