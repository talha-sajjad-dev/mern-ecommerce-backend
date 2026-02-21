import { CreateOptionDto, OptionResponseDto } from "../dtos/option.dto.js";
import optionRepository from "../repositories/option.repository.js";
import { AppError } from "../utils/errors.util.js";

class OptionService {
    async create(payload) {
        const optionData = new CreateOptionDto(payload);
        const option = await optionRepository.findByName(optionData.name);
        if (option) {
            throw new AppError('Option Already Exists', 409);
        }

        const newOption = await optionRepository.create(optionData);

        return OptionResponseDto.fromOption(newOption);
    }

    async update(payload, id) {
        const optionData = new CreateOptionDto(payload);
        const option = await optionRepository.findById(id);
        if (!option) {
            throw new AppError('Option Not Found', 404);
        }

        const updatedOption = await optionRepository.updateById(optionData, id);
        return updatedOption;
    };

    async getAll() {
        const options = await optionRepository.all();

        return {
            options,
        }
    }

    async getOptionById(id) {
        const option = await optionRepository.findById(id);
        if (!option) {
            throw new AppError('Option Not Found', 404);
        }

        return option;
    }
}

export default new OptionService();