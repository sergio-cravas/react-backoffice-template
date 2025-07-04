import defaultConfig from './default.json';
import devConfig from './development.json';
import localConfig from './local.json';
import prodConfig from './production.json';

const isLocal = import.meta.env.USE_MOCKS;
const envConfigs = {
  local: localConfig,
  development: devConfig,
  production: prodConfig,
};

export default {
  ...defaultConfig,
  ...envConfigs[(isLocal ? 'local' : import.meta.env.NODE_ENV) || 'development'],
};
