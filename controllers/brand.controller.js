import brandService from "../services/brand.service.js";
import { asyncHandler } from "../utils/async-handler.util.js";
import ApiResponse from "../utils/response.util.js";

class BrandController {
    create = asyncHandler(async (req, res) => {
        const logo = req.file;
        const values = JSON.parse(req.body.values);

        const brand = await brandService.create({logo, values});
        if (!brand) {
            return ApiResponse.error(res, 'Brand Not Create', 500);
        }

        return ApiResponse.success(res, brand, 'Brand Created Successfully', 200);
    });

    update = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const values = JSON.parse(req.body.values);
        const logo = req.file; 
        
        const brand = await brandService.update({ logo, values }, id);

        if (!brand) {
            return ApiResponse.error(res, 'Brand Not Updated', 500);
        }

        return ApiResponse.success(res, brand, 'Brand Updated Successfully', 200);
    });

    getBrands = asyncHandler(async (req, res) => {
        const brands = await brandService.getBrands();
        if (!brands) {
            return ApiResponse.error(res, 'Brands Not Found', 404);
        }

        return ApiResponse.success(res, brands, 'Brands Found Successfully', 200);
    });

    getBrandById = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const brand = await brandService.getBrandById(id);

        if (!brand) {
            return ApiResponse.error(res, 'Brand Not Found', 404);
        }

        return ApiResponse.success(res, brand, 'Brand Found Successfully', 200);
    })
    
    delete = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const result = await brandService.delete(id);

        if (!result) {
            return ApiResponse.error(res, 'Brand Not Deleted', 404);
        }

        return ApiResponse.success(res, result, 'Brand Deleted Successfully', 200);
    })
}

export default new BrandController();