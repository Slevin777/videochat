const express = require('express');
const routes = require('../routes');
const cors = require('cors');
const https = require('https');
const fs = require('fs');


const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/', routes);

/* const server = https
  .createServer(
    {
      key: fs.readFileSync('./https/server.key'),
      cert: fs.readFileSync('./https/server.cer'),
    },
    app
  ) */

const server = app.listen(process.env.PORT || 9001, () => console.log('Listening on port 9001'));


module.exports = server;
