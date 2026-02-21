import mongoose, { Schema } from 'mongoose';

const sellerSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },

    logo: {
        url: {
            type: String,
            default: null,
        },
        publicId: {
            type: String,
            default: null,
        }
    },

    storeName: {
        type: String,
        required: true,
    },

    licenseId: {
        type: Number,
        required: true,
    },

    businessType: {
        type: String,
        required: true,
    },

    storeDescription: {
        type: String,
    },

    licenseDoc: {
        url: {
            type: String,
            default: null,
        },
        publicId: {
            type: String,
            default: null,
        }
    },

    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    }
}, { timestamps: true });

export default mongoose.model('Seller', sellerSchema);