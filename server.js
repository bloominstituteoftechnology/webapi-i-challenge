const express = require('express');
//const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/userRouter.js');

const server = express();

//custom middleware [m1,m2,mn]
function logger(req, res, next) { //next points to the next middleware
    //console.log('body: ', req.body); 

    next();
}

//middleware - middleware has override power
//server.use(morgan('dev'));
server.use(helmet());
server.use(cors()); // gets an object; only gets request from this dom
server.use(express.json()); //body parser, ability to use middleware and routers (express)
server.use(logger);

server.use('/api/users', userRouter);

server.get('/', function(req, res) { //object represent request & object represent response
    res.json( { api: 'Running...'} )
});

server.listen(5000, () => console.log('API Running on port 5000'));