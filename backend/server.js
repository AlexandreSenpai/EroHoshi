const express = require('express');
const cors = require('cors');
const app = express()
const routes = require('./routes');

const port = 8080

app.use(cors());
app.use('/api/', routes);

app.listen(port, () => {
    console.log('running.');
});