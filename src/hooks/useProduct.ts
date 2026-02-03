import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/db';
import type { Product } from '@/types/product';

/**
 * Hook to fetch a single product from IndexedDB by name.
 * @param name - The product name (primary key)
 */
export function useProduct(name: string) {
    return useQuery<Product | null>({
        queryKey: ['product', name],
        queryFn: async () => {
            const product = await db.products.get(name);
            return product ?? null;
        },
        enabled: !!name,
        staleTime: 5 * 60 * 1000, // 5 minutes - product data rarely changes
    });
}
