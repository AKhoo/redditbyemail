var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db/config');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

// Endpoints
  // REST api/user
  // GET api/posts

app.get('/api/posts', (req, res) => {
  // TBD
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

