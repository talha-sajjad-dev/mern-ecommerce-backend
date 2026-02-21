import productService from "../services/product.service.js";
import { asyncHandler } from "../utils/async-handler.util.js";
import ApiResponse from '../utils/response.util.js'

class ProductController{
    create = asyncHandler(async (req, res) => {
        const values = req.body;         
        const mainImage = req.files?.mainImage?.[0];
        const additionalImages = req.files?.additionalImages || [];

        const product = await productService.create({ values, mainImage, additionalImages });

        if (!product) {
            return ApiResponse.error(res, 'Product Not Created', 500);
        }

        return ApiResponse.success(res, product, 'Product Created Successfully', 200);
    });

    update = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const values = req.body;         
        const mainImage = req.files?.mainImage?.[0];
        const additionalImages = req.files?.additionalImages || [];

        const product = await productService.update({ values, mainImage, additionalImages }, id);

        if (!product) {
            return ApiResponse.error(res, 'Product Not Updated', 500);
        }

        return ApiResponse.success(res, product, 'Product Updated Successfully', 200);
    });

    getProducts = asyncHandler(async (req, res) => {
        const products = await productService.getAll();

        if (!products) {
            return ApiResponse.error(res, 'Products Not Found', 404);
        }

        return ApiResponse.success(res, products, 'Products Found Successfully', 200);
    })

    getProductById = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const product = await productService.getProductById(id);

        if (!product) {
            return ApiResponse.error(res, 'Product Not Found', 404);
        }

        return ApiResponse.success(res, product, 'Product Found Successfully', 200);
    })

    delete = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const result = await productService.delete(id);

        if (!result) {
            return ApiResponse.error(res, 'Product Not Deleted', 404);
        }

        return ApiResponse.success(res, result, 'Product Deleted Successfully', 200);
    })
}

export default new ProductController();