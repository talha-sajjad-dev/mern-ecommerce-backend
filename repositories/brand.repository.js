import Brand from '../models/brand.model.js';

class BrandRepository {
    async findByName(name) {
        return await Brand.findOne({ name });
    }

    async create(brand) {
        return Brand.create(brand);
    }

    async updateById(brand, id) {
        return Brand.findByIdAndUpdate(
            id,
            { $set: brand },
            { new: true, runValidators: true }
        );
    }

    async all() {
        return Brand.find();
    }

    async findById(id) {
        return Brand.findById(id);
    }

    async deleteById(id) {
        return Brand.findByIdAndDelete(id);
    }
}

export default new BrandRepository();