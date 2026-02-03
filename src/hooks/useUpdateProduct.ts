import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/lib/db';
import type { Product } from '@/types/product';

/**
 * Updates product in IndexedDB with optimistic UI updates.
 * Rollback on error, invalidates list & detail queries on settle.
 */
export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (product: Product) => db.products.put(product),

        onMutate: async (newProduct) => {
            // Cancel any outgoing refetches to avoid overwriting optimistic update
            await queryClient.cancelQueries({ queryKey: ['product', newProduct.name] });

            // Snapshot the previous value for rollback
            const previousProduct = queryClient.getQueryData<Product>(['product', newProduct.name]);

            // Optimistically update the cache
            queryClient.setQueryData(['product', newProduct.name], newProduct);

            // Return context with snapshot for potential rollback
            return { previousProduct };
        },

        onError: (_error, newProduct, context) => {
            // Rollback to previous value on error
            if (context?.previousProduct) {
                queryClient.setQueryData(['product', newProduct.name], context.previousProduct);
            }
        },

        onSettled: (_data, _error, variables) => {
            // Invalidate queries to refetch fresh data
            queryClient.invalidateQueries({ queryKey: ['product', variables.name] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
