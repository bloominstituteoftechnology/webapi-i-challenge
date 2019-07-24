// implement your API here

const express = require("express")
const db = require('./data/db.js')

const app = express();

const port = 3000;



app.get('./api/users' , (request, response) => {
    response.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});