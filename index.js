

//==============================================================================

//-- Dependencies --------------------------------
const express = require('express');
const users = require('./users.js');

//-- Http Routing --------------------------------
const server = express();
server.use('/api/users', users);

//-- Configure server to accept requests ---------
server.listen(8080);