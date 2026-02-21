import Bank from '../models/bank.model.js';
import Seller from '../models/seller.model.js';

class BankRepository {
    async create(bank) {
        return await Bank.create(bank);
    }
}

export default new BankRepository();