import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './styles/index.css';

/**
 * main.jsx — Application entry point.
 *
 * Sets up:
 * - React 19 concurrent root
 * - BrowserRouter for client-side routing
 * - QueryClientProvider for TanStack Query (data caching)
 * - StrictMode for development safety
 */

// Configure the QueryClient with sensible defaults
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

const root = createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
