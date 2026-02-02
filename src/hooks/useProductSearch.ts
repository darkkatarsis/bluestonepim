import { useMemo } from 'react';
import { useProducts } from './useProducts';
import { useDebounce } from './useDebounce';
import { createProductSearchIndex, searchProducts } from '@/lib/fuseIndex';
import type { Product } from '@/types/product';

interface UseProductSearchResult {
    results: Product[];
    isLoading: boolean;
    error: Error | null;
    isSearching: boolean;
}

/**
 * Fuzzy search hook for products.
 * Combines TanStack Query data, debounced input and Fuse.js indexing.
 */
export function useProductSearch(query: string): UseProductSearchResult {
    const { data: products = [], isLoading, error } = useProducts();
    const debouncedQuery = useDebounce(query, 300);

    // Create Fuse index only when products change
    const fuseIndex = useMemo(() => createProductSearchIndex(products), [products]);

    // Compute results only when necessary
    const results = useMemo(() => {
        if (!debouncedQuery.trim()) return products;
        return searchProducts(fuseIndex, debouncedQuery);
    }, [fuseIndex, debouncedQuery, products]);

    return {
        results,
        isLoading,
        error: error ?? null,
        isSearching: query !== debouncedQuery,
    };
}
