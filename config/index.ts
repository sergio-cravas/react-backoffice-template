import defaultConfig from './default.json';
import devConfig from './development.json';
import localConfig from './local.json';
import mockProdConfig from './mock-production.json';
import prodConfig from './production.json';

const isLocal = import.meta.env.USE_MOCKS;
const isProdWithMocks = import.meta.env.USE_MOCKS_PROD;

const envConfigs = {
  local: localConfig,
  development: devConfig,
  production: prodConfig,
  mockProduction: mockProdConfig,
};

const finalConfig =
  (isLocal ? 'local' : isProdWithMocks ? 'mockProduction' : import.meta.env.NODE_ENV) || 'development';

export default {
  ...defaultConfig,
  ...envConfigs[finalConfig],
};
