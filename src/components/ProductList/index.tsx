'use client';

import Link from 'next/link';
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Typography, Skeleton, Box } from '@mui/material';
import { ProductThumbnail } from '@/components/ProductThumbnail';
import type { Product } from '@/types/product';

interface ProductListProps {
    products: Product[];
    isLoading?: boolean;
}

export function ProductList({ products, isLoading }: ProductListProps) {
    if (isLoading) {
        return <ProductListSkeleton />;
    }

    if (products.length === 0) {
        return (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
                No products found
            </Typography>
        );
    }

    return (
        <List>
            {products.map((product) => (
                <ListItem key={product.name} disablePadding>
                    <ListItemButton component={Link} href={`/products/${encodeURIComponent(product.name)}`}>
                        <ListItemAvatar>
                            <ProductThumbnail product={product} />
                        </ListItemAvatar>
                        <ListItemText primary={product.number} secondary={product.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

function ProductListSkeleton() {
    return (
        <Box sx={{ mt: 2 }}>
            {[1, 2, 3].map((i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                    <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
