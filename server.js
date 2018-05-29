const express = require ('express');
const db = require ('./data/db')
const API = require ('./api')
const server = express();
server.use(express.json())
const port = 5000;


server.get('/', (req, res)=> {
    //1st arg: route where a resource can be interacted with
    //2nd arg: callback to deal with sending responses, and handling incoming
    res.send('Hello from express.');
});


server.post('/api/smurf', (req, res)=> {
    console.log(req.body);
    res.send('Success!');
})


server.listen( port , () =>console.log(`Server running on port ${port}.`))

