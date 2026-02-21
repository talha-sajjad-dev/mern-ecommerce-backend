import cloudinary from "../config/cloudinary.js";
import { CreateBrandDto } from "../dtos/brand.dto.js";
import brandRepository from "../repositories/brand.repository.js";
import { AppError } from "../utils/errors.util.js";

class BrandService {
    async create(payload) {
        const brandData = new CreateBrandDto(payload);
        const brand = await brandRepository.findByName(brandData.name);
        if (brand) {
            throw new AppError('Brand Already Exists', 409);
        }

        const newbrand = await brandRepository.create(brandData);
        return newbrand;
    }

    async update(payload, id) {
        const brandData = new CreateBrandDto(payload);
    
        const brand = await brandRepository.findById(id);
        if (!brand) {
            throw new AppError('Brand Not Found', 404);
        }

        if (brand?.logo?.publicId) {
            await cloudinary.uploader.destroy(brand.logo.publicId);
        }

        const updatedBrand = await brandRepository.updateById(brandData, id);
        return updatedBrand;
    };

    async getBrands() {
        return brandRepository.all();
    }

    async getBrandById(id) {
        const brand = await brandRepository.findById(id);
        if (!brand) {
            throw new AppError('brandrand Not Found', 404);
        }

        return brand;
    }

    async delete(id) {
        const brand = await brandRepository.deleteById(id);
        
        if (!brand) {
            throw new AppError('Brand Not Found', 404);
        }

        return brand;
    }
}

export default new BrandService();