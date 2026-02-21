import { CreateSellerDto, SellerResponseDto } from "../dtos/seller.dto.js";
import userRepository from "../repositories/user.repository.js";
import SellerRepository from "../repositories/seller.repository.js";
import { AppError } from "../utils/errors.util.js";
import addressRepository from "../repositories/address.repository.js";
import bankRepository from "../repositories/bank.repository.js";
import { UserResponseDto } from "../dtos/user.dto.js";
import sellerRepository from "../repositories/seller.repository.js";
import { sendApplySellerMail } from "../email/send-seller-apply-mail.js";

class SellerService {
    async apply(req) {
        const userId = req.user.id;
        const logo = req.files.logo[0];
        const licenseDoc = req.files.licenseDoc[0];
        const values = JSON.parse(req.body.values);

        const user = await userRepository.findById(userId);
        if (!user) {
            throw new AppError('User Not Exists. Please Create User Profile First before applying as a Seller!', 404);
        }

        const newSellerData = new CreateSellerDto(values, logo, licenseDoc, userId);
        
        const seller = await SellerRepository.create({ userId, ...newSellerData.businessInfo });
        await addressRepository.create({ userId, ...newSellerData.addressInfo});
        await bankRepository.create({ userId, ...newSellerData.bankInfo })

        const updatedUser = await userRepository.update(userId, { isSeller: true });

        if (!seller) {
            throw new AppError('Seller not Created!', 505);
        }

        await sendApplySellerMail(user.email);

        return {
            seller: SellerResponseDto.fromSeller(seller),
            user: UserResponseDto.fromUser(updatedUser),
        };
    }

    async getAll() {
        const sellers = await sellerRepository.all({ withUser: true });

        return {
            sellers,
        }
    }
}

export default new SellerService();