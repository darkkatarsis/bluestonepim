import Dexie, { type EntityTable } from 'dexie';
import type { Product } from '@/types/product';

// Database class extending Dexie with typed tables
class BlueStonePIMDatabase extends Dexie {
    products!: EntityTable<Product, 'name'>;

    constructor() {
        super('BlueStonePIM');

        this.version(1).stores({
            // name = primary key, number = indexed for search
            products: 'name, number',
        });
    }
}

// Export singleton database instance
export const db = new BlueStonePIMDatabase();

// Seed database with initial data if empty
// Called on first app load to populate IndexedDB from JSON
export async function seedDatabaseIfEmpty(): Promise<void> {
    const count = await db.products.count();

    if (count === 0) {
        // Dynamic import to avoid bundling JSON in every chunk
        const initialProducts = await import('@/data/products.json').then(
            (module) => module.default as Product[],
        );

        await db.products.bulkPut(initialProducts);
        console.log(`Database seeded with ${initialProducts.length} products`);
    }
}
