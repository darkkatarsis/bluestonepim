'use client';

import { useState } from 'react';
import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import type { ProductImage } from '@/types/product';

interface ProductGalleryProps {
    images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    if (!images || images.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                    color: 'text.secondary',
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                }}
            >
                <ImageIcon sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="body2">No images available</Typography>
            </Box>
        );
    }

    return (
        <ImageList cols={3} gap={8}>
            {images.map((image, index) => (
                <GalleryImage key={`${image.url}-${index}`} image={image} />
            ))}
        </ImageList>
    );
}

interface GalleryImageProps {
    image: ProductImage;
}

function GalleryImage({ image }: GalleryImageProps) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <ImageListItem>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 150,
                        bgcolor: 'action.hover',
                        borderRadius: 1,
                        color: 'text.secondary',
                    }}
                >
                    <ImageIcon sx={{ fontSize: 32, mb: 0.5 }} />
                    <Typography variant="caption" noWrap sx={{ maxWidth: '100%', px: 1 }}>
                        {image.name || 'Image unavailable'}
                    </Typography>
                </Box>
            </ImageListItem>
        );
    }

    return (
        <ImageListItem>
            <img
                src={image.url}
                alt={image.name}
                loading="lazy"
                onError={() => setHasError(true)}
                style={{
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: 4,
                }}
            />
        </ImageListItem>
    );
}
