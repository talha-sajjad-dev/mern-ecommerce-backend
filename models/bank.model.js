import mongoose, { Schema } from 'mongoose';

const bankSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },

    accountHolder: {
        type: String,
        required: true,
    },
    
    bankName: {
        type: String,
        required: true,
    },

    iban: {
        type: Number,
        required: true,
    },

    cvc: {
        type: Number,
        required: true,
    },

    bankAccType: {
        type: String,
        required: true,
    },

    isVerified: {
        type: Boolean,
        required: false,
    }
}, { timestamps: true });

export default mongoose.model('Bank', bankSchema);