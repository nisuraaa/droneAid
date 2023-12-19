import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const logSchema = new Schema({
    event: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        maxlength: 100,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },

});


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
    battery: {
        type: Number,
        min: 0,
        max: 100,
        default: 100
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
    lastCharged: {
        type: Date,
        default: "2021-01-01T00:00:00.000Z"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    
    },
    logs: [logSchema],
});

// export both the schemas 
const Drones = mongoose.model("drones", DroneSchema);
const Logs = mongoose.model("logs", logSchema);
export { Drones, Logs };