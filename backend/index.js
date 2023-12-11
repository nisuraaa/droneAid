
const express = require('express'); 
const morgan = require('morgan');
const app = express(); 
const PORT = 3000; 
app.use(morgan('tiny'));

app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
);

app.get('/', (req, res) => {
    res.send('Hello World!');}
);