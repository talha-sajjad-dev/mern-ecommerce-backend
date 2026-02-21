import Product from "../models/product.model.js";

class ProductRepository {
    async create(product) {
        return await Product.create(product);
    }

    async findBySku(sku) {
        return Product.findOne({ sku });
    }

    async findById(id) {
        return Product.findById(id);
    }

    async all() {
        return await Product.find().populate('categoryId', 'name');
    }

    async updateById(product, id) {
        return Product.findByIdAndUpdate(
            id,
            { $set: product },
            { new: true, runValidators: true }
        );
    }

    async deleteById(id) {
        return Product.findByIdAndDelete(id);
    }
}

export default new ProductRepository();