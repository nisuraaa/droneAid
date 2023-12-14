import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MediSchema = new Schema({
    _id: ObjectId,
    mediID: {
        type: String,
        required: true,
        unique: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        maxlength: 30,
        required: true,
    },
});

const Medicine = mongoose.model("medicine",MediSchema );

export default Medicine;