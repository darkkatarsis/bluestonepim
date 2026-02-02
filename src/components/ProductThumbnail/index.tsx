'use client';

import { useState } from 'react';
import { Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import type { Product } from '@/types/product';

interface ProductThumbnailProps {
    product: Product;
}

export function ProductThumbnail({ product }: ProductThumbnailProps) {
    const firstImage = product.images?.[0]?.url;
    const [hasError, setHasError] = useState(false);

    if (!firstImage || hasError) {
        return (
            <Avatar>
                <ImageIcon />
            </Avatar>
        );
    }

    const altText = product.images[0]?.name || product.number;

    return <Avatar alt={altText} src={firstImage} onError={() => setHasError(true)} />;
}
