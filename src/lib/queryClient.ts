import { QueryClient } from '@tanstack/react-query';

// Query client configured for local IndexedDB data source
// No external API calls - data is always "fresh" from local storage
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            // Keep unused data in memory for 30 minutes
            gcTime: 1000 * 60 * 30,
            // No need to refetch local data
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 1,
        },
    },
});
