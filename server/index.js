const express = require('express');
const routes = require('../routes');
const cors = require('cors');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/', routes);

const server = app.listen(9001, () => console.log('Listening on port 9001'));

module.exports = server;
