const express = require('express');
const routes = require('../routes');
const cors = require('cors');

const app = express();
// app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');


  // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}) */

app.use(cors())
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
