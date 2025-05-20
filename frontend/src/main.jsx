import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import { routeTree } from './routing/routeTree'
import {
  RouterProvider,
  createRouter,
} from '@tanstack/react-router'

const queryClient = new QueryClient()

const router = createRouter({ routeTree })

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)


