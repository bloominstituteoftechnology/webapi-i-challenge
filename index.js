// implement your API here

//import express from 'express'; ES6 modules

const express = require('express'); //CommonJS modules

const server = express(); //creates a server


const port = 9000;
server.listen(port, () => console.log(`API running on port ${port}`));
