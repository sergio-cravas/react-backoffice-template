import { createRoot } from 'react-dom/client';

import App from './app/app';

import './index.scss';

async function enableMocking() {
  if (!import.meta.env.USE_MOCKS || !import.meta.env.USE_MOCKS_PROD) return;

  const { worker } = await import('./mocks/worker');

  return worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />);
});
