import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    orderID: {
        type: String,
        required: true,
        unique: true,
    },
    address1: {
        type: String,
        required: true,

    },
    address2: {
        type: String,
        required: true,

    },
    city: {
        type: String,
        required: true,
    },

    weight: {
        type: Number,
        required: true,
    },
    firstname: {
        type: String,
        maxlength: 30,
        required: true,
    },
    items: {
        type: Array
    },
    lastname: {
        type: String,
        maxlength: 30,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['delivering', 'delivered'],
        default: 'delivering'
    },
    droneUUID: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const MediOrder = mongoose.model("MediOrder", OrderSchema);

export default MediOrder;