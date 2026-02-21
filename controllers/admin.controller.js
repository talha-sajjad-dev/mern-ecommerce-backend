import adminService from "../services/admin.service.js";
import { asyncHandler } from "../utils/async-handler.util.js";
import ApiResponse from '../utils/response.util.js';

class AdminController {
    updateSellerStatus = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const status = req.body.status;

        const seller = await adminService.updateSellerStatus(id, status);
        if (!seller) {
            return ApiResponse.error(res, seller, 'Seller Not Updated', 500);
        }

        return ApiResponse.success(res, seller, 'Seller Updated Successfuly', 200);
    })
}

export default new AdminController();