import express, { query } from 'express';
const router = express.Router();

import { Drones } from '../models/droneModel.js';
import { Logs } from '../models/droneModel.js';
import DroneModels from '../models/TypeModel.js';

const generateRandomSerial = () => {
    const serial = Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
    return serial;
}

export const generateLog = async (droneUUID, event_name, description) => {
    if (droneUUID === 'all') {
        const drones = await Drones.find({ isDeleted: false });
        drones.forEach(async (drone) => {
            const log = new Logs({
                event: event_name,
                description: "Battery Level is " + drone.battery + "%",
            });
            // push to first position of array
            await Drones.findOneAndUpdate({ uuid: drone.uuid }, {
                $push: {
                    logs: {
                        $each: [log], $position: 0, $slice: 30
                    }
                }
            });
        });
        return;
    } else {
        const log = new Logs({
            event: event_name,
            description: description,
        });
        await Drones.findOneAndUpdate({ uuid: droneUUID }, {
            $push: {
                logs: {
                    $each: [log], $position: 0, $slice: 30
                }
            }
        });

        return;
    }


};

export const changeStatus = async (droneUUID, status) => {

    const drone = await Drones.findOne({ uuid: droneUUID });
    console.log(status);

    let event_name = 'STATUS_CHANGE_EVENT';

    if (drone) {
        let prevStatus = drone.status;
        if (status === 'idle') {
            if (drone.status === 'charging') {
                drone.lastCharged = Date.now();
                event_name = 'CHARGE_REMOVE_EVENT';
                drone.status = 'idle';
            } else if (drone.status === 'returning' || drone.status === 'loading' || drone.status === 'loaded') {
                drone.status = 'idle';
            } else {
                return { message: 'Invalid status', status: 'error' };
            }
        } else if (status === 'loading') {
            if (drone.status === 'idle' || drone.status === 'loaded') {
                drone.status = 'loading';
            } else {
                return { message: 'Invalid status', status: 'error' };
            }
        } else if (status === 'delivering') {
            if (drone.status === 'loaded' || drone.status === 'loading') {
                drone.status = 'delivering';
            } else {
                return { message: 'Invalid status', status: 'error' };
            }
        } else if (status === 'delivered') {
            if (drone.status === 'delivering') {
                drone.status = 'delivered';
            } else {
                return { message: 'Invalid status', status: 'error' };
            }

        } else if (status === 'returning') {
            if (drone.status === 'delivered') {
                drone.status = 'returning';
            } else {
                return { message: 'Invalid status', status: 'error' };
            }

        } else if (status === 'charging') {
            if (drone.status === 'idle') {
                drone.status = 'charging';
                event_name = 'CHARGE_EVENT';
            } else {
                return { message: 'Invalid status', status: 'error' };
            }
        } else {
            return { message: 'Invalid status', status: 'error' };
        }

        generateLog(drone.uuid, event_name, `Status changed from ${prevStatus} to ${drone.status}`);

        await drone.save();
        return { message: 'Status changed successfully', status: 'success' };
    } else {
        return { message: 'Drone not found', status: 'error' };
    }
}

router.put('/changestatus', async (req, res) => {
    const { droneUUID, status } = req.body;
    const resp = await changeStatus(droneUUID, status);
    console.log(resp);
    res.status(200).json(resp);
});

router.get('/alldrones/:filter', async (req, res) => {
    const filter = req.params.filter;
    console.log(filter);
    if (filter === 'all') {
        const drones = await Drones.find({ isDeleted: false }).populate('_model');
        console.log(drones);
        res.status(200).json(drones);
    } else {
        const drones = await Drones.find({ isDeleted: false, status: filter }).populate('_model');
        console.log(drones);
        res.status(200).json(drones);
    }
}
);

router.get('/recommend', async (req, res) => {

    const weight = req.query.weight;
    console.log(req.query);

    const drones = await Drones.find({ isDeleted: false, status: 'idle' })
        .populate({
            model: 'dronemodels',
            path: '_model',
            match: { maxWeight: { $gte: weight } }
        });

    // Filter out the drones whose _model field is null
    const filteredDrones = drones.filter(drone => drone._model !== null);

    res.status(200).json(filteredDrones);
    // res.status(200).json(drones);
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

router.get('/logs/:id', async (req, res) => {

    const drone = await Drones.findOne({ uuid: req.params.id });

    // console.log(drone);
    res.json(drone.logs);
});


export default router
