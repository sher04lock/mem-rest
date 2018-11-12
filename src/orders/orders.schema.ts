import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    remarks: String,
    userId: String,
    customer: {
        firstName: String,
        lastName: String,
        address: {
            country: String,
            city: String,
            zipCode: String,
            street: String,
            streetNumber: String,
        }
    },
    email: String,
    phone: String,
    date: Date,
    title: String,
    items: [{
        name: String,
        quantity: Number,
        price: Number,
    }],
});
