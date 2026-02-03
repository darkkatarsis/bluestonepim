import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductList } from '@/components/ProductList';
import type { Product } from '@/types/product';

describe('ProductList', () => {
    const mockProducts: Product[] = [
        {
            name: 'product-1',
            number: 'Product One',
            description: 'Description 1',
            images: [],
        },
        {
            name: 'product-2',
            number: 'Product Two',
            description: 'Description 2',
            images: [{ url: 'https://example.com/img.jpg', name: 'Image' }],
        },
        {
            name: 'product-3',
            number: 'Product Three',
            description: 'Description 3',
            images: [],
        },
    ];

    it('should render all products', () => {
        render(<ProductList products={mockProducts} />);

        expect(screen.getByText('Product One')).toBeInTheDocument();
        expect(screen.getByText('Product Two')).toBeInTheDocument();
        expect(screen.getByText('Product Three')).toBeInTheDocument();
    });

    it('should render product names as secondary text', () => {
        render(<ProductList products={mockProducts} />);

        expect(screen.getByText('product-1')).toBeInTheDocument();
        expect(screen.getByText('product-2')).toBeInTheDocument();
        expect(screen.getByText('product-3')).toBeInTheDocument();
    });

    it('should render links to product details', () => {
        render(<ProductList products={mockProducts} />);

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(3);

        expect(links[0]).toHaveAttribute('href', '/products/product-1');
        expect(links[1]).toHaveAttribute('href', '/products/product-2');
        expect(links[2]).toHaveAttribute('href', '/products/product-3');
    });

    it('should show skeleton when isLoading is true', () => {
        render(<ProductList products={[]} isLoading />);

        expect(screen.queryByText('No products found')).not.toBeInTheDocument();

        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should show "No products found" when products array is empty', () => {
        render(<ProductList products={[]} />);

        expect(screen.getByText('No products found')).toBeInTheDocument();
    });

    it('should not show "No products found" when products exist', () => {
        render(<ProductList products={mockProducts} />);

        expect(screen.queryByText('No products found')).not.toBeInTheDocument();
    });
});
