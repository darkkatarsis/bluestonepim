import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/db';
import type { Product } from '@/types/product';

/**
 * Hook to fetch all products from IndexedDB.
 */
export function useProducts() {
    return useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: () => db.products.toArray(),
    });
}
