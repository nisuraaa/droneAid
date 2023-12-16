import express from 'express';
const router = express.Router();

import medicine from '../models/mediModel.js';
import { changeStatus } from './drone.js';
import MediOrder from '../models/mediOrderModel.js';


const generateRandomSerial = () => {
    const serial = Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
    return serial;
}


router.get('/all', async (req, res) => {

    const allMeds = await medicine.find();
    console.log(allMeds)
    res.json(allMeds);
});



router.post('/createorder', async (req, res) => {

    const { address, email, weight, droneUUID, phone, firstname, lastname } = req.body;


    const order = new MediOrder({
        address: address,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        weight: weight,
        droneUUID: droneUUID,
    });

    const savedOrder = await order.save();
    console.log(await changeStatus(droneUUID, 'delivering'));
    res.status(200).json({ message: 'Order created successfully', status: 'success' });
});

router.get('/allorders', async (req, res) => {
    const allOrders = await MediOrder.find();
    res.json(allOrders);
});

export default router