import Seller from '../models/seller.model.js';

class SellerRepository {
    async create(sellerData) {
        return await Seller.create(sellerData);
    }

    async getByUserId(userId) {
        return await Seller.findOne({ userId });
    }

    async all(withUser = false) {
        const query = Seller.find();
        if (withUser) {
            query.populate('userId');
        }
        return await query;
    }

    async findById(id) {
        return await Seller.findById(id);
    }

    async save(seller) {
        return await seller.save();
    }
}

export default new SellerRepository();