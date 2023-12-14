import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: "json" };
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mediRoutes from './routes/medicine.js'
import droneRoutes from './routes/drone.js';

dotenv.config();

const app = express();
const PORT = 3000;
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/drone', droneRoutes);
app.use('/medi', mediRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected")).catch((error) => console.log(error));

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

