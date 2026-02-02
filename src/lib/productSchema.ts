import { z } from 'zod';

// Schema for product image validation
export const productImageSchema = z.object({
    url: z.string().url('Invalid image URL'),
    name: z.string().min(1, 'Image name is required'),
});

// Schema for product validation
export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    number: z.coerce.string().min(1, 'Product number is required'),
    description: z.string().min(1, 'Description is required'),
    images: z.array(productImageSchema),
});

// TypeScript type inferred from Zod schema
export type ProductFormData = z.infer<typeof productSchema>;
