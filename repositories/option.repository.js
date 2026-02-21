import Option from "../models/option.model.js";

class OptionRepository {
    async create(option) {
        return await Option.create(option);
    }

    async findByName(name) {
        return await Option.findOne({ name });
    }

    async all() {
        return await Option.find();
    }

    async findById(id) {
        return Option.findById(id);
    }

    async updateById(option, id) {
        return Option.findByIdAndUpdate(
            id,
            { $set: option },
            { new: true, runValidators: true }
        );
    }
}

export default new OptionRepository();