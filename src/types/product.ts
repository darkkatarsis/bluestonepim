// Product image type
export interface ProductImage {
    url: string;
    name: string;
}

// Product type matching the recruitment task data structure
export interface Product {
    name: string; // Primary key (unique identifier)
    number: string; // Product number/title
    description: string; // Product description
    images: ProductImage[]; // Array of product images
}
