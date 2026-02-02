import Dexie, { type EntityTable } from 'dexie';
import type { Product } from '@/types/product';

class BlueStonePIMDatabase extends Dexie {
    products!: EntityTable<Product, 'name'>;

    constructor() {
        super('BlueStonePIM');

        this.version(1).stores({
            // name as primary key, number indexed for faster searches
            products: 'name, number',
        });
    }
}

export const db = new BlueStonePIMDatabase();

/**
 * Seeds the database with initial products from JSON if it's empty.
 * Uses dynamic import to prevent bundling the JSON in initial chunks.
 */
export async function seedDatabaseIfEmpty(): Promise<void> {
    const count = await db.products.count();

    if (count === 0) {
        const initialProducts = await import('@/data/products.json').then((module) => module.default as Product[]);

        await db.products.bulkPut(initialProducts);
        console.log(`Database seeded with ${initialProducts.length} products`);
    }
}
