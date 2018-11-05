

//==============================================================================

//-- Dependencies --------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const users = require('./users.js');

//-- Http Routing --------------------------------
const server = express();
server.use(express.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/api/users', users);

//-- Configure server to accept requests ---------
server.listen(8080);
