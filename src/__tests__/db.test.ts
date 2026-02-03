import { describe, it, expect, beforeEach } from 'vitest';
import { db, seedDatabaseIfEmpty } from '@/lib/db';

describe('Database Operations', () => {
    beforeEach(async () => {
        await db.products.clear();
    });

    describe('seedDatabaseIfEmpty', () => {
        it('should seed database with 3 initial products', async () => {
            await seedDatabaseIfEmpty();

            const count = await db.products.count();
            expect(count).toBe(3);
        });

        it('should not re-seed if database already has data', async () => {
            await seedDatabaseIfEmpty();

            await seedDatabaseIfEmpty();

            const count = await db.products.count();
            expect(count).toBe(3);
        });
    });

    describe('get by name (primary key)', () => {
        it('should return product by name', async () => {
            await seedDatabaseIfEmpty();

            const product = await db.products.get('b0006se5bq');

            expect(product).toBeDefined();
            expect(product?.name).toBe('b0006se5bq');
            expect(product?.number).toBe('singing coach unlimited');
        });

        it('should return undefined for non-existent product', async () => {
            await seedDatabaseIfEmpty();

            const product = await db.products.get('non-existent-product');

            expect(product).toBeUndefined();
        });
    });

    describe('put (upsert)', () => {
        it('should insert new product', async () => {
            const newProduct = {
                name: 'new-product',
                number: 'NEW-001',
                description: 'A brand new product',
                images: [],
            };

            await db.products.put(newProduct);

            const retrieved = await db.products.get('new-product');
            expect(retrieved).toEqual(newProduct);
        });

        it('should update existing product', async () => {
            await seedDatabaseIfEmpty();

            // Update existing product
            await db.products.put({
                name: 'b0006se5bq',
                number: 'UPDATED NUMBER',
                description: 'Updated description',
                images: [],
            });

            const updated = await db.products.get('b0006se5bq');
            expect(updated?.number).toBe('UPDATED NUMBER');
            expect(updated?.description).toBe('Updated description');
        });
    });
});
