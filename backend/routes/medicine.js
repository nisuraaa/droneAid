import express from 'express';
const router = express.Router();

import medicine from '../models/mediModel.js';
// import med from '../models/TypeModel.js';


const generateRandomSerial = () => {
    const serial = Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
    return serial;
}


router.get('/all', async (req, res) => {

    const allMeds = await medicine.find();
    console.log(allMeds)
    res.json(allMeds);
});

export default router