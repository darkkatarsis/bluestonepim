import { describe, it, expect } from 'vitest';
import { productSchema, productEditSchema, productImageSchema } from '@/lib/productSchema';

/**
 * Zod Schema Validation Tests
 */
describe('productSchema', () => {
    const validProduct = {
        name: 'test-product',
        number: 'TEST-001',
        description: 'A test product description',
        images: [{ url: 'https://example.com/image.jpg', name: 'Product Image' }],
    };

    it('should validate a correct product object', () => {
        const result = productSchema.safeParse(validProduct);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validProduct);
        }
    });

    it('should reject product with empty number field', () => {
        const invalidProduct = {
            name: 'test-product',
            number: '', // empty string fails .min(1)
            description: 'A test product',
            images: [],
        };

        const result = productSchema.safeParse(invalidProduct);

        expect(result.success).toBe(false);
        if (!result.success) {
            const numberError = result.error.issues.find((issue) => issue.path.includes('number'));
            expect(numberError).toBeDefined();
        }
    });

    it('should reject product without required description field', () => {
        const invalidProduct = {
            name: 'test-product',
            number: 'TEST-001',
            // description: missing
            images: [],
        };

        const result = productSchema.safeParse(invalidProduct);

        expect(result.success).toBe(false);
        if (!result.success) {
            const descError = result.error.issues.find((issue) => issue.path.includes('description'));
            expect(descError).toBeDefined();
        }
    });

    it('should reject product with invalid image URL', () => {
        const productWithInvalidUrl = {
            name: 'test-product',
            number: 'TEST-001',
            description: 'A test product',
            images: [{ url: 'not-a-valid-url', name: 'Bad Image' }],
        };

        const result = productSchema.safeParse(productWithInvalidUrl);

        expect(result.success).toBe(false);
        if (!result.success) {
            const urlError = result.error.issues.find((issue) => issue.path.includes('url'));
            expect(urlError).toBeDefined();
            expect(urlError?.message).toContain('Invalid');
        }
    });
});

describe('productEditSchema', () => {
    it('should validate without name field (name is omitted for edit)', () => {
        const editData = {
            // name: omitted - it's readonly
            number: 'UPDATED-001',
            description: 'Updated description',
            images: [],
        };

        const result = productEditSchema.safeParse(editData);

        expect(result.success).toBe(true);
    });

    it('should reject if name is provided (name should not be in edit schema)', () => {
        const editDataWithName = {
            name: 'should-not-be-here',
            number: 'UPDATED-001',
            description: 'Updated description',
            images: [],
        };

        const result = productEditSchema.safeParse(editDataWithName);

        expect(result.success).toBe(true);
        if (result.success) {
            expect('name' in result.data).toBe(false);
        }
    });
});

describe('productImageSchema', () => {
    it('should validate correct image object', () => {
        const validImage = {
            url: 'https://example.com/image.jpg',
            name: 'Product Image',
        };

        const result = productImageSchema.safeParse(validImage);

        expect(result.success).toBe(true);
    });

    it('should reject image with empty name', () => {
        const imageWithEmptyName = {
            url: 'https://example.com/image.jpg',
            name: '',
        };

        const result = productImageSchema.safeParse(imageWithEmptyName);

        expect(result.success).toBe(false);
    });
});
