import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { queryClient } from './config/queryClient';
import { AuthProvider } from './contexts/AuthProvider';
import './index.css';
import { router } from './routes/routes';

const container = document.getElementById('root');
const isContainerValid = container !== null;
const root = createRoot(isContainerValid ? container : document.body);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom' />
    </QueryClientProvider>
  </React.StrictMode>,
);
