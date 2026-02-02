export interface ProductImage {
    url: string;
    name: string;
}

export interface Product {
    /** Primary key (used in IndexedDB and dynamic routing) */
    name: string;
    number: string;
    description: string;
    /** May be empty – we support fallback in the UI */
    images: ProductImage[];
}
