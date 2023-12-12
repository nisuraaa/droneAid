import express from 'express';
const router = express.Router();

router.get('/alldrones', (req, res) => {
    const drones = [
        {
            id: 1,
            name: 'drone1',
            model: 'model1',
            status: 'active'
        },
        {
            id: 2,
            name: 'drone2',
            model: 'model2',
            status: 'active'
        },
        {
            id: 3,
            name: 'drone3',
            model: 'model3',
            status: 'active'
        },
        {
            id: 4,
            name: 'drone4',
            model: 'model4',
            status: 'active'
        },
        {
            id: 5,
            name: 'drone5',
            model: 'model5',
            status: 'active'
        },
        {
            id: 6,
            name: 'drone6',
            model: 'model6',
            status: 'active'
        },
        {
            id: 7,
            name: 'drone7',
            model: 'model7',
            status: 'active'
        },
        {
            id: 8,
            name: 'drone8',
            model: 'model8',
            status: 'active'
        },
        {
            id: 9,
            name: 'drone9',
            model: 'model9',
            status: 'active'
        },
        {
            id: 10,
            name: 'drone10',
            model: 'model10',
            status: 'active'
        }
    ];
    res.status(200).json(drones);
});

router.get('/drones/:id', (req, res) => {
    const drones = [
        {
            id: 1,
            name: 'drone1',
            model: 'model1',
            status: 'active'
        },
        {
            id: 2,
            name: 'drone2',
            model: 'model2',
            status: 'active'
        },
        {
            id: 3,
            name: 'drone3',
            model: 'model3',
            status: 'active'
        },
        {
            id: 4,
            name: 'drone4',
            model: 'model4',
            status: 'active'
        },
        {
            id: 5,
            name: 'drone5',
            model: 'model5',
            status: 'active'
        },
        {
            id: 6,
            name: 'drone6',
            model: 'model6',
            status: 'active'
        },
        {
            id: 7,
            name: 'drone7',
            model: 'model7',
            status: 'active'
        },
        {
            id: 8,
            name: 'drone8',
            model: 'model8',
            status: 'active'
        },
        {
            id: 9,
            name: 'drone9',
            model: 'model9',
            status: 'active'
        },
        {
            id: 10,
            name: 'drone10',
            model: 'model10',
            status: 'active'
        }
    ];
    console.log(req.params.id);

    const drone = drones.find((d) => d.id === parseInt(req.params.id));

    if (!drone) res.status(404).send('Drone not found');
    console.log(drone);


    res.json(drone);
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

router.post('/register', (req, res) => { 
    console.log(req.body);
    res.send('Drone registered');
});

export default router;