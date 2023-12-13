import mongoose, { Model } from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ModelSchema = new Schema({
    id: ObjectId,
    modelID: { type: String, Index: true },
    name: String,
    maxWeight: Number
});

const Models = mongoose.model("dronemodels", ModelSchema);

export default Models;