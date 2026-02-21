import { CreateOptionDto, OptionResponseDto } from "../dtos/option.dto.js";
import { CreateProductDto, ProductResponseDto } from "../dtos/product.dto.js";
import optionRepository from "../repositories/option.repository.js";
import productRepository from "../repositories/product.repository.js";
import { AppError } from "../utils/errors.util.js";

class ProductService {
    async create(payload) {
        const productData = new CreateProductDto(payload);
        
        const product = await productRepository.findBySku(productData.sku);
        if (product) {
            throw new AppError('Product with this Slug Already Exist', 409);
        }

        const newproduct = await productRepository.create(productData);

        return newproduct;
    };

    async update(payload, id) {
        const productData = new CreateProductDto(payload);
 
        const product = await productRepository.findById(id);
        if (!product) {
            throw new AppError('Product Not Found', 404);
        }

        productData.additionalImages = [
            ...JSON.parse(payload.values.existingAdditionalImages),
            ...productData.additionalImages,
        ];

        const updatedProduct = await productRepository.updateById(productData, id);

        return updatedProduct;
    };

    async getAll() {
        const products = await productRepository.all();

        return products.map(product => ProductResponseDto.fromProduct(product));
    }

    async getProductById(id) {
        const product = await productRepository.findById(id);
        if (!product) {
            throw new AppError('Product Not Found', 404);
        }

        return product;
    }

    async delete(id) {
        const product = await productRepository.deleteById(id);
        
        if (!product) {
            throw new AppError('Product Not Found', 404);
        }

        return product;
    }
}

export default new ProductService();