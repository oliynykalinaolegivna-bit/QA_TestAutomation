interface Product {
    id: string;
    name: string;
    [key: string]: unknown;
}

export function generateMockProducts(originalProducts: Product[], count: number): Product[] {
    const products: Product[] = [];
    for (let i = 0; i < count; i++) {
        const product = { ...originalProducts[i % originalProducts.length] };
        product.id = `product-${i}`;
        product.name = `Product ${i + 1}`;
        products.push(product);
    }
    return products;
}