// implement your API here
//how to import or export code between files
//introduce how routing works
//import express from 'express'; ES2015 modules
//which has on the other side > export default someCode
//but today we will use
//step 1. yarn add express in terminal to use express
const express = require('express'); //CommonJS modules > module.exports = someCode

//step 6. How to get the data from the databanks/datafolder into the server?
const db = require('./data/db.js'); //giving us access to the data object in the datafolder

const server = express(); //step 1 continue....this creates the server
//watch for traffic in a particular computer port
//a port is like an apt# url is the apartment building address, but the port is the door
//ex: http://localhost:3000 >the 3000 is the port
//example....80: http, 443: https (sercure version of http, that have encryptions), 
//25: email servers 

//step 7. setting up the server to get this user data on json, if this
//url '/api/user' is every requested through GET.
server.get('/api/users', (req, res) => {
    db.find().then(users => {
            console.log('\n** users **', users);
            res.json(users);
    })
    .catch(err => res.send(err));
}); //dont freaking forget to add '/api/users' to the localhost:9000/api/users, save youself two hours of wondering why this sin't working XD
//results will appear both on browser after you add that bit ^^, and in the terminal >called with the console.log()

// server.get('/', (req, res) => { //step 5. before this request handler, you will get an error, BUT, it will be
//     //listening to the server "Cannot GET /"", very different error from there is no such site.
//     //"hey server if you ever see a GET request for this '/' slash, the root, then do this function"
//     res.send('<h1>Hello Michelle! Its Alive!!</h1>'); //if this request^^ comes in, respond with this <<
// }); //type into browser localhost w/e port to see results, fyi (req, res) are called homies lol

//step 2. setup which port you want to use, defining the port
const port = 9000;
server.listen(port, () => console.log(`API running cats and wizards on port ${port}`));
//step 3. to see it it is running, type in terminal node index.js
//should see your mesage pop up API running catss...and the port we choose, 9000
//but servers dont refresh so you have to do it, it stop the server
//control + c, restart it with yarn start..but this can become tiresome
//there are dependencies that can do this for you, restart the server upon every change
//like nodemon...
//we are going to change in the pack.json, under nodemon- whihc is a monitor that 
//watches for changes to know when to restart
//  for practice we will change under script, "start" to "server"
//then in the terminal write npm run server, or yarn server
//step 4. now you write yarn server not yarn start!!!! JEEZ XDXD this is neat...


//for the homework yarn add cors in terminal, and with this line
//server.use(cors()); this needed to connect from react
//const cors = require('cors'); ----this between experess and const db above, this is needed to connet from react
