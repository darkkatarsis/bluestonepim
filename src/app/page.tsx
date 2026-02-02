'use client';

import { useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { ProductSearch } from '@/components/ProductSearch';
import { ProductList } from '@/components/ProductList';
import { useProductSearch } from '@/hooks/useProductSearch';

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const { results, isLoading, isSearching } = useProductSearch(searchQuery);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Bluestone PIM Products
            </Typography>

            <ProductSearch value={searchQuery} onChange={setSearchQuery} />

            {isLoading ? (
                <ProductList products={[]} isLoading />
            ) : isSearching ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                        Searching...
                    </Typography>
                </Box>
            ) : (
                <ProductList products={results} />
            )}
        </Container>
    );
}
