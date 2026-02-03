import { ProductDetails } from '@/components/ProductDetails';

interface ProductPageProps {
    params: Promise<{
        name: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);

    return <ProductDetails productName={decodedName} />;
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);

    return {
        title: `${decodedName} | Bluestone PIM`,
        description: `Product details for ${decodedName}`,
    };
}
