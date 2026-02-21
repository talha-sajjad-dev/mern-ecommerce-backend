import categoryService from "../services/category.service.js";
import { asyncHandler } from "../utils/async-handler.util.js";
import ApiResponse from "../utils/response.util.js";

class CategoryController{
    create = asyncHandler(async (req, res) => {
        const logo = req.file;
        const values = JSON.parse(req.body.values);

        const category = await categoryService.create({ logo, values });
        if (!category) {
            return ApiResponse.error(res, 'Category Not Created', 500);
        }

        return ApiResponse.success(res, category, 'Category Created Successfully', 200);
    });

    update = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const values = JSON.parse(req.body.values);
        const logo = req.file; 
        
        const category = await categoryService.update({ logo, values }, id);

        if (!category) {
            return ApiResponse.error(res, 'Category Not Updated', 500);
        }

        return ApiResponse.success(res, category, 'Category Updated Successfully', 200);
    });

    getCategories = asyncHandler(async (req, res) => {
        const { type, parentId } = req.query;
        
        const categories = await categoryService.getCategories({ type, parentId });

        if (!categories) {
            return ApiResponse.error(res, 'Categories Not Found', 404);
        }

        return ApiResponse.success(res, categories, 'Categories Found Successfully', 200);
    });

    getCategoryById = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const category = await categoryService.getCategoryById(id);

        if (!category) {
            return ApiResponse.error(res, 'Category Not Found', 404);
        }

        return ApiResponse.success(res, category, 'Category Found Successfully', 200);
    })

    delete = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const result = await categoryService.delete(id);

        if (!result) {
            return ApiResponse.error(res, 'Category Not Deleted', 404);
        }

        return ApiResponse.success(res, result, 'Category Deleted Successfully', 200);
    })
}

export default new CategoryController();