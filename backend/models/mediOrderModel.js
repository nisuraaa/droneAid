import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({

    address: {
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
});

const MediOrder = mongoose.model("MediOrder", OrderSchema);

export default MediOrder;