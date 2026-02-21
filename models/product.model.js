import mongoose, { Schema } from 'mongoose';


const imageSchema = new Schema({
    url: {
        type: String,
        default: 'https://ito-group.com/wp-content/uploads/2025/04/no-image.jpg',
    },
    publicId: {
        type: String,
        default: null,
    }
}, { _id: false })

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    shortDescription: {
        type: String,
        required: true,
        trim: true,
    },

    longDescription: {
        type: String,
        default: '',
    },

    sku: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        uppercase: true,
    },

    mainImage: {
        type: imageSchema,
        default: {
            url: 'https://ito-group.com/wp-content/uploads/2025/04/no-image.jpg',
            publicId: null,
        }
    },

    additionalImages: {
        type: [imageSchema],
        default: [],
        validate: {
            validator: (arr) => arr.length <= 20,
            message: 'Maximum 20 additional images allowed'
        }
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    quantity: {
        type: Number,
        required: true,
        min: 0,
    },

    options: [
        {
            optionId: {
                type: Schema.Types.ObjectId,
                ref: 'Option',
            },
            values: {
                type: [Schema.Types.ObjectId],
            }
        }
    ],

    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },

    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
        default: process.env.DEFAULT_BRAND_ID,
    },

    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
    },
    
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },

    tags: {
        type: [String],
        default: [],
    },

    status: {
        type: String,
        enum: ['enabled', 'disabled'],
        default: 'enabled',
        required: true,
    }

}, { timestamps: true });

productSchema.virtual('inStock').get(function() {
    return this.quantity > 0;
});

export default mongoose.model('Product', productSchema);