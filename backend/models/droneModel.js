import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DroneSchema = new Schema({
    id: ObjectId,
    uuid: {
        type: String,
        required: true,
    },
    serial: {
        type: String,
        maxlength: 100,
        required: true,
    },
    name: {
        type: String,
        maxlength: 30,
        required: true,
    },
    _model: {
        type: Schema.Types.ObjectId,
        ref: 'dronemodels',
        required: true,
    },
    status: {
        type: String,
        enum: ['idle', 'loading', 'loaded', 'delivering', 'delivered', 'returning', 'charging'],
        default: 'idle'
    },
    battery : {
        type: Number,
        min: 0,
        max: 100,
        default: 100
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required : true
    },
});

const Drones = mongoose.model("drones", DroneSchema);

export default Drones;