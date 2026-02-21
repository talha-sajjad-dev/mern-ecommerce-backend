import express from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import productController from "../controllers/product.controller.js";
import { uploadProductImages } from "../uploads/image.upload.js";

const productRouter = express.Router();

productRouter.post(
    '/', 
    authenticateToken,
    authorize('admin'), 
    uploadProductImages.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'additionalImages', maxCount: 5 }
    ]),
    productController.create
);

productRouter.get(
    '/',
    authenticateToken,
    authorize('admin'), 
    productController.getProducts
);

productRouter.get(
    '/:id',
    authenticateToken,
    authorize('admin'), 
    productController.getProductById
);

productRouter.put(
    '/:id', 
    authenticateToken,
    authorize('admin'), 
    uploadProductImages.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'additionalImages' }
    ]),
    productController.update
);

productRouter.delete(
    '/:id',
    authenticateToken,
    authorize('admin'), 
    productController.delete
);


export default productRouter;