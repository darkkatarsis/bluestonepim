import Fuse, { type IFuseOptions } from 'fuse.js';
import type { Product } from '@/types/product';

// Fuse.js configuration for product search
const fuseOptions: IFuseOptions<Product> = {
    keys: [
        { name: 'name', weight: 0.4 },
        { name: 'number', weight: 0.4 },
        { name: 'description', weight: 0.2 },
    ],
    threshold: 0.4,
    includeScore: true,
    shouldSort: true,
    minMatchCharLength: 2,
};

// Create Fuse instance dynamically from products array
export function createProductSearchIndex(products: Product[]): Fuse<Product> {
    return new Fuse(products, fuseOptions);
}

/**
 * Search for products using fuzzy matching.
 * Returns up to 10 results sorted by relevance.
 */
export function searchProducts(fuse: Fuse<Product>, query: string): Product[] {
    if (!query.trim()) return [];
    return fuse
        .search(query)
        .map((result) => result.item)
        .slice(0, 10);
}
