import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { LangContextProvider } from '@/features/lang/context/lang.context';

import { router } from './router';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LangContextProvider>
        <Toaster />

        <RouterProvider router={router} />
      </LangContextProvider>
    </QueryClientProvider>
  );
}

export default App;
