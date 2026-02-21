import { AddressResponseDto } from "./address.dto.js";

class SellerResponseDto {
    static fromSeller(seller) {
        return {
            id: seller._id,
            status: seller.status,
        }
    }
}

class CreateSellerDto {
    constructor(data, logo, licenseDoc) {
        this.addressInfo = {
            type: 'shop',
            street: data.street,
            country: data.country,
            state: data.state,
            city: data.city,
            postalCode: data.postalCode,
        };
        this.bankInfo = {
            accountHolder: data.bankHolderName,
            bankName: data.bankName,
            iban: data.iban,
            cvc: data.cvc,
            bankAccType: data.bankAccType,
            isVerified: false
        };
        this.businessInfo = {
            logo: {
                url: logo.path,
                publicId: logo.filename,
            },
            storeName: data.storeName,
            licenseId: data.licenseId,
            businessType: data.businessType,
            storeDescription: data.storeDescription,
            licenseDoc: {
                url: logo.path,
                publicId: logo.filename,
            },
            status: 'pending',
            terms: data.terms,
        };
    }
}

export { SellerResponseDto, CreateSellerDto };
