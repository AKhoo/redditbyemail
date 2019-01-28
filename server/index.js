var express = require('express');
var bodyParser = require('body-parser');
var db = require('../db/index');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

// Endpoints
  // REST api/user
  // GET api/posts

// Gets posts for the default user for use on the web site
app.get('/api/posts', (req, res) => {
  console.log('get request received to fetch posts')
  db.getPosts('adriankhoo.ca+redditdefault@gmail.com', (posts) => {
    res.send(posts);
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

