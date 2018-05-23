const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// anything that is served data is a client
const userRouter = require('./usersRoutes');
const server = express();


server.listen(5000, () => {
    console.log('===SERVER RUNNING ON PORT 5000===');
})

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', userRouter);

// okay now, just like in the lecture video, let's make our server routes:

