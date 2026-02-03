'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Divider, Skeleton, Snackbar, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useProduct } from '@/hooks/useProduct';
import { useUpdateProduct } from '@/hooks/useUpdateProduct';
import { ProductGallery } from '@/components/ProductGallery';
import { productEditSchema, type ProductEditFormData } from '@/lib/productSchema';

interface ProductDetailsProps {
    productName: string;
}

export function ProductDetails({ productName }: ProductDetailsProps) {
    const { data: product, isLoading, isError } = useProduct(productName);
    const updateMutation = useUpdateProduct();

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm<ProductEditFormData>({
        resolver: zodResolver(productEditSchema),
        mode: 'onChange',
    });

    // Reset form when product data loads
    useEffect(() => {
        if (product) {
            reset({
                number: product.number,
                description: product.description,
                images: product.images,
            });
        }
    }, [product, reset]);

    const onSubmit = (data: ProductEditFormData) => {
        if (!product) return;

        updateMutation.mutate(
            {
                ...product,
                ...data,
            },
            {
                onSuccess: () => {
                    setSnackbar({
                        open: true,
                        message: 'Product saved successfully',
                        severity: 'success',
                    });
                },
                onError: (error) => {
                    setSnackbar({
                        open: true,
                        message: `Failed to save: ${error.message}`,
                        severity: 'error',
                    });
                },
            },
        );
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    // Loading state
    if (isLoading) {
        return <ProductDetailsSkeleton />;
    }

    // Error state
    if (isError) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography color="error">Error loading product</Typography>
                <Button component={Link} href="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
                    Back to list
                </Button>
            </Container>
        );
    }

    // Not found state
    if (!product) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Product not found
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    The product &quot;{productName}&quot; does not exist.
                </Typography>
                <Button component={Link} href="/" startIcon={<ArrowBackIcon />} variant="contained">
                    Back to list
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Button component={Link} href="/" startIcon={<ArrowBackIcon />} size="small">
                    Back
                </Button>
                <Typography variant="h4" component="h1">
                    {product.name}
                </Typography>
            </Box>

            {/* Image Gallery */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Images
                </Typography>
                <ProductGallery images={product.images} />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Edit Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h6" gutterBottom>
                    Product Details
                </Typography>

                <TextField label="Name" value={product.name} disabled fullWidth margin="normal" slotProps={{ input: { readOnly: true } }} helperText="Product name cannot be changed" />

                <TextField {...register('number')} label="Number" fullWidth margin="normal" error={!!errors.number} helperText={errors.number?.message} />

                <TextField {...register('description')} label="Description" fullWidth multiline rows={4} margin="normal" error={!!errors.description} helperText={errors.description?.message} />

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button type="submit" variant="contained" disabled={!isDirty || !isValid || updateMutation.isPending}>
                        {updateMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                    <Button component={Link} href="/" variant="outlined">
                        Cancel
                    </Button>
                </Box>
            </Box>

            {/* Success/Error Snackbar */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} message={snackbar.message} />
        </Container>
    );
}

function ProductDetailsSkeleton() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Skeleton variant="rectangular" width={80} height={36} />
                <Skeleton variant="text" width={200} height={40} />
            </Box>

            <Skeleton variant="text" width={100} height={32} sx={{ mb: 1 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rectangular" width={150} height={150} />
                <Skeleton variant="rectangular" width={150} height={150} />
                <Skeleton variant="rectangular" width={150} height={150} />
            </Box>

            <Skeleton variant="text" width={150} height={32} sx={{ mt: 4, mb: 2 }} />
            <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
        </Container>
    );
}
