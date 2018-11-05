

//==============================================================================

//-- Dependencies --------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./users.js');

//-- Http Routing --------------------------------
const server = express();
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/api/users', users);

//-- Configure server to accept requests ---------
server.listen(8080);
