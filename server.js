const express = require ('express');
const db = require ('./data/db')
const API = require ('./api')
const server = express();
server.use(express.json())
const port = 5000;




server.listen( port , () =>console.log(`Server running on port ${port}.`))





// server.get('/', (req, res)=> {
//     //1st arg: route where a resource can be interacted with
//     //2nd arg: callback to deal with sending responses, and handling incoming
//     res.send('Hello from express.');
// });