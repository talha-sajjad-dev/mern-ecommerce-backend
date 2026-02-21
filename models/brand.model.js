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


const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
}, { timestamps: true });

export default mongoose.model('Brand', brandSchema);