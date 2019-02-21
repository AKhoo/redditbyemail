const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const db = require('../db/index');
const User = require('../db/user');

const app = express();

app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));


// Gets posts for the default user for use on the web site
app.get('/api/posts', (req, res) => {
  console.log('get request received to fetch posts');
  db.getPosts('adriankhoo.ca+redditdefault@gmail.com', (posts) => {
    res.set({
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true,
    });
    res.send(posts);
  });
});

app.post('/api/users', (req, res) => {
  console.log('post request received to add user');
  console.log(req.body);
  User.add(req.body, () => {
    res.set({
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true,
    });
    res.sendStatus(200);
  });
});

app.get('/unsubscribe', (req, res) => {
  const email = req.query.email.replace(' ', '+');
  console.log(`delete request received to delete ${email}`);
  User.delete(email, () => {
    res.send('Unsubscribe request has been processed.');
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

module.exports.handler = serverless(app);
