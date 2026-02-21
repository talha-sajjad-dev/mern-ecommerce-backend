import { asyncHandler } from "../utils/async-handler.util.js";
import ApiResponse from "../utils/response.util.js";
import optionService from "../services/option.service.js";

class OptionController{
    create = asyncHandler(async (req, res) => {
        const optiondata = req.body;

        const option = await optionService.create(optiondata);
        if (!option) {
            return ApiResponse.error(res, 'Option Not Created', 500);
        }

        return ApiResponse.success(res, option, 'Option Created Successfully', 200);
    })

    update = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const optiondata = req.body;
        
        const option = await optionService.update(optiondata, id);

        if (!option) {
            return ApiResponse.error(res, 'Option Not Updated', 500);
        }

        return ApiResponse.success(res, option, 'Option Updated Successfully', 200);
    });

    getOptions = asyncHandler(async (req, res) => {
        const options = await optionService.getAll();
        
        return ApiResponse.success(res, options, 'All Options Fetched Successfully', 200);
    })

    getOptionById = asyncHandler(async (req, res) => {
        const id = req.params.id;
        const option = await optionService.getOptionById(id);

        if (!option) {
            return ApiResponse.error(res, 'Option Not Found', 404);
        }

        return ApiResponse.success(res, option, 'Option Found Successfully', 200);
    })
}

export default new OptionController();