class CreateProductDto {
  constructor({ values = {}, mainImage, additionalImages = [] }) {
    if (!values) values = {};

    this.name = values.name?.trim() || '';
    this.shortDescription = values.shortDescription?.trim() || '';
    this.longDescription = values.longDescription?.trim() || '';
    this.sku = values.sku?.toUpperCase()?.trim() || '';

    // Main image
    mainImage && (this.mainImage = {
      url: mainImage.path || '',
      publicId: mainImage.filename || '',
    })

    // Additional images
    if (Array.isArray(additionalImages)) {
      this.additionalImages = additionalImages.map(img => ({
          url: img.path || '',
          publicId: img.filename || ''
      }));
    }
    
    this.price = Number(values.price) || 0;
    this.quantity = Number(values.quantity) || 0;

    // Options array safely parsed
    try {
      this.options = typeof values.selectedOptions === 'string'
        ? JSON.parse(values.selectedOptions)
        : Array.isArray(values.selectedOptions)
        ? values.selectedOptions
        : [];
    } catch (err) {
      this.options = [];
    }

    this.discount = Number(values.discount) || 0;
    this.brandId = values.brand || process.env.DEFAULT_BRAND_ID;
    values.sellerId && (this.sellerId = values.sellerId);
    this.categoryId = values.categoryId || null;

    // Tags safely parsed
    try {
      this.tags = typeof values.tags === 'string'
        ? JSON.parse(values.tags)
        : Array.isArray(values.tags)
        ? values.tags
        : [];
    } catch (err) {
      this.tags = [];
    }

    this.status = values.status || 'enabled';
  }
}

class ProductResponseDto {
    static fromProduct(product) {
        return {
            id: product._id,
            name: product.name,
            category: product.categoryId,
            price: product.price,
            stock: product.quantity,
            inStock: product.inStock,
        }
    }
}


export { ProductResponseDto, CreateProductDto };