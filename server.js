const express = require('express');
const cors = require('cors');
const serverRouter = require('./serverRoutes');
const { logger } = require('./middleWare');

const app = express();
const port = 5000;

app.use(cors());

app.use(logger);
app.use('/api/users', serverRouter);


app.listen(port, () => {
    console.log(` === APP LISTENING IN ${port} === `);
})