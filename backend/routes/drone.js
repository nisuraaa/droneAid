import express from 'express';
const router = express.Router();

import Drones from '../models/droneModel.js';
import DroneModels from '../models/TypeModel.js';

const generateRandomSerial = () => {
    const serial = Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
    return serial;
}

router.get('/alldrones', async (req, res) => {

    const drones = await Drones.find({ isDeleted: false }).populate('_model');

    console.log(drones);
    res.status(200).json(drones);
});

router.get('/recommend', async (req, res) => {

    const weight = req.body.weight;
    console.log(req.body);
    const drones = await Drones.find({ isDeleted: false })
        .populate({
            model: 'dronemodels',
            path: '_model',
            match: { maxWeight: { $gte: weight } }
        });

    // Filter out the drones whose _model field is null
    const filteredDrones = drones.filter(drone => drone._model !== null);

    res.status(200).json(filteredDrones);
});


router.get('/drones/:id', async (req, res) => {

    const drone = await Drones.find({ uuid: req.params.id }).populate('_model');
    console.log(drone);
    res.json(drone[0]);
});

router.get('/models', async (req, res) => {
    const models = await DroneModels.find();
    console.log(models);
    res.json(models);
});

router.post('/register', async (req, res) => {
    console.log(req.body);

    // const model = req.body.model;

    const modelFound = await DroneModels.findOne({ modelID: req.body.model });
    console.log(modelFound);
    console.log(modelFound._id);

    var newDrone = new Drones({
        uuid: generateRandomSerial(),
        serial: req.body.serial,
        name: req.body.name,
        _model: modelFound._id
    });

    const drone = await newDrone.save();
    // console.log(drone);

    res.send('Drone registered');
});




router.patch('/drones/:id', async (req, res) => {

    const drone = await Drones.findOneAndUpdate({ uuid: req.params.id }, { isDeleted: true }, { new: true });

    console.log(drone);
    // if (!drone) res.status(404).send('Drone not found');
    res.send('Drone deleted');
});


export default router;