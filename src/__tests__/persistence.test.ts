import { describe, it, expect, beforeEach } from 'vitest';
import { db, seedDatabaseIfEmpty } from '@/lib/db';

describe('Data Persistence', () => {
    beforeEach(async () => {
        await db.products.clear();
    });

    it('should persist seeded data after simulated reload', async () => {
        await seedDatabaseIfEmpty();

        // Simulate browser reload
        db.close();
        await db.open();

        // Verify data persisted
        const count = await db.products.count();
        expect(count).toBe(3);
    });

    it('should persist updated product after simulated reload', async () => {
        await db.products.put({
            name: 'test-product',
            number: 'Old Number',
            description: 'Old description',
            images: [],
        });

        await db.products.put({
            name: 'test-product',
            number: 'New Number',
            description: 'New description',
            images: [],
        });

        // Simulate browser reload
        db.close();
        await db.open();

        const reloaded = await db.products.get('test-product');
        expect(reloaded?.number).toBe('New Number');
        expect(reloaded?.description).toBe('New description');
    });

    it('should persist new product alongside seeded data', async () => {
        await seedDatabaseIfEmpty();

        await db.products.put({
            name: 'custom-product',
            number: 'Custom 123',
            description: 'User created product',
            images: [],
        });

        // Simulate browser reload
        db.close();
        await db.open();

        const count = await db.products.count();
        expect(count).toBe(4);

        const customProduct = await db.products.get('custom-product');
        expect(customProduct?.number).toBe('Custom 123');
    });
});
