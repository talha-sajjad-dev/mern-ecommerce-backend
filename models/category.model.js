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
}, { _id: false });

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },

    logo: {
        type: imageSchema,
        default: {
            url: 'https://ito-group.com/wp-content/uploads/2025/04/no-image.jpg',
            publicId: null
        }
    },

    status: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled',
    },
    
});

categorySchema.index({ parentId: 1, slug: 1 }, { unique: true });

export default mongoose.model('Category', categorySchema);