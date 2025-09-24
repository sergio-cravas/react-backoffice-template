import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { LanguageProvider } from '@/shared/ui/features/lang/language-provider';

import { router } from './router';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Toaster />

        <RouterProvider router={router} />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
