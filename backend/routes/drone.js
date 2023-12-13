import express from 'express';
const router = express.Router();

import Drones from '../models/droneModel.js';
import DroneModels from '../models/TypeModel.js';

const generateRandomSerial = () => {
    const serial = Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
    return serial;
}

router.get('/alldrones', async (req, res) => {

    const drones  = await Drones.find();
   
    console.log(drones);
    res.status(200).json(drones);
});

router.get('/drones/:id', async (req, res) => {
    
    const drone = await Drones.find({uuid: req.params.id}).populate('_model');
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

    const drone  = await newDrone.save();
    // console.log(drone);

    res.send('Drone registered');
});

router.delete('/drones/:id', async (req, res) => {
    const drone = await Drones.deleteOne({ uuid: req.params.id });

    console.log(drone);
    // if (!drone) res.status(404).send('Drone not found');
    res.send('Drone deleted');
});



export default router;