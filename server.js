var express = require('express')
var db = require('./data/db')

app = express()

app.get('/', (req, res) => {
  db.find().then((response) => res.send(response))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))