import cloudinary from "../config/cloudinary.js";
import { CreateCategoryDto } from "../dtos/category.dto.js";
import categoryRepository from "../repositories/category.repositoy.js";
import { AppError } from "../utils/errors.util.js";

class categoryService {
    async create(payload) {
        const categoryData = new CreateCategoryDto(payload);
        const { name, slug, parentId } = categoryData;

        if (! parentId) {
            const category = await categoryRepository.findParentByNameOrSlug(name, slug);           
            if (category) {
                throw new AppError('A parent category with this name or slug already exists', 409);
            }
        } else {
            console.log('hererere');
            const category = await categoryRepository.findChildByNameOrSlug({ name, slug, parentId });
            if (category) {
                throw new AppError('A child category with this name or slug already exists under this parent', 409);
            }         
        }

        const newCategory = await categoryRepository.create(categoryData);

        return newCategory;
    }

    async update(payload, id) {
        const categoryData = new CreateCategoryDto(payload);

    
        const category = await categoryRepository.findById(id);
        if (!category) {
            throw new AppError('Category Not Found', 404);
        }

        if (category.logo.publicId) {
            await cloudinary.uploader.destroy(category.logo.publicId);
        }

        const updatedCategory = await categoryRepository.updateById(categoryData, id);
        return updatedCategory;
    };

    async getCategories({ type, parentId }) {
        let filter = {};

        if (type === 'parent') filter = { parentId: null };
        if (type === 'child') filter = { parentId: { $ne: null } };
        if (parentId) filter = { parentId };

        return categoryRepository.all(filter);
    }

    async getCategoryById(id) {
        const category = await categoryRepository.findById(id);
        if (!category) {
            throw new AppError('Category Not Found', 404);
        }

        return category;
    }

    async delete(id) {
        const brand = await categoryRepository.deleteById(id);
        
        if (!brand) {
            throw new AppError('Category Not Found', 404);
        }

        return brand;
    }
}

export default new categoryService();