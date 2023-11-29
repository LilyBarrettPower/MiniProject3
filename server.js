
// include express using require
const express = require('express');
const serverApp = express();
// require dotenv to use environment variables
require("dotenv").config();

let dbConnect = require('./dbConnect');

const spaceXroute = require('./routes/SpaceXroutes');

// use the port from the environment variables 
const PORT = process.env.PORT || 3000;

serverApp.use(express.json());
serverApp.use('/spaceapi', spaceXroute);

// Start the server as log a message to the console 
serverApp.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));