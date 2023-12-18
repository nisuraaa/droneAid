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

    const { droneUUID, items, customer, weight } = req.body;

    console.log(req.body);
    try{

        const order = new MediOrder({
            orderID: generateRandomSerial(),
            firstname: customer.firstname,
            lastname: customer.lastname,
            // items: items,
            phone: customer.mobile,
            email: customer.email,
            weight: weight,
            address1: customer.address1,
            address2: customer.address2,
            city: customer.city,
            droneUUID: droneUUID,
        });
        const savedOrder = await order.save();
        console.log(await changeStatus(droneUUID, 'delivering'));
        res.status(200).json({ message: 'Order created successfully', status: 'success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error', status: 'error' });
    }

});

router.get('/allorders', async (req, res) => {
    const allOrders = await MediOrder.find();
    res.json(allOrders);
});

export default router