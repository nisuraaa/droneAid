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

router.get('/models', (req, res) => {
    const models = [{
        id: 1,
        name: 'model1',
        description: 'description1'
    },
    {
        id: 2,
        name: 'model2',
        description: 'description2'
    },
    {
        id: 3,
        name: 'model3',
        description: 'description3'
    },
    {
        id: 4,
        name: 'model4',
        description: 'description4'
    },
    {
        id: 5,
        name: 'model5',
        description: 'description5'
    },
    {
        id: 6,
        name: 'model6',
        description: 'description6'
    },
    {
        id: 7,
        name: 'model7',
        description: 'description7'
    },
    {
        id: 8,
        name: 'model8',
        description: 'description8'
    },
    {
        id: 9,
        name: 'model9',
        description: 'description9'
    },
    {
        id: 10,
        name: 'model10',
        description: 'description10'

    }]

    res.json(models);
});

router.post('/register', async (req, res) => {
    console.log(req.body);

    const model = req.body.model;

    const modelFound = await DroneModels.findOne({ modelID: model });
    console.log(modelFound);
    console.log(modelFound._id);

    var newDrone = new Drones({
        uuid: generateRandomSerial(),
        serial: req.body.serial,
        name: req.body.name,
        _model: modelFound._id
    });

    const drone  = await newDrone.save();
    console.log(drone);

    res.send('Drone registered');
});

router.delete('/drones/:id', async (req, res) => {
    const drone = await Drones.deleteOne({ uuid: req.params.id });

    console.log(drone);
    // if (!drone) res.status(404).send('Drone not found');
    res.send('Drone deleted');
});



export default router;