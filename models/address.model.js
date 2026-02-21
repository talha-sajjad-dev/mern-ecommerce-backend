import mongoose, { Schema } from 'mongoose';

const AddressSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },

    type: {
      type: String,
      enum: ['home', 'shop'],
      default: 'home',
    },

    country: {
      type: String,
      required: true,
      default: 'Pakistan',
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    street: {
      type: String,
      required: true,
    },

    postalCode: String,
}, { timestamps: true });

export default mongoose.model('Address', AddressSchema);