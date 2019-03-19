const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const aws = require('aws-sdk');
const db = require('../db/index');
const User = require('../db/user');

const app = express();

app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

const lambda = new aws.Lambda({
  region: 'us-east-1',
});

// Gets posts for the default user for use on the web site
app.get('/api/posts', (req, res) => {
  console.log('get request received to fetch posts');
  console.log('process.env.mongoUrl:', process.env.mongoUrl);
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
    console.log('User added. Next line is to invoke sendEmails function')
    lambda.invoke({
      FunctionName: 'redditByEmail-dev-sendEmails',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({ newSubscriber: req.body.email }),
    }, (error, data) => {
      if (error) {
        console.log('error', error);
      }
      if (data.Payload) {
        console.log('Lambda function invoked: redditByEmail-dev-sendEmails');
        res.set({
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials" : true,
        });
        res.sendStatus(200);
        console.log('Sent 200 status.');
      }
    });
  });
});

app.get('/unsubscribe', (req, res) => {
  const email = req.query.email.replace(' ', '+');
  console.log(`delete request received to delete ${email}`);
  User.delete(email, () => {
    res.send('Unsubscribe request has been processed.');
  });
});

app.listen(3001, () => {
  console.log('listening on port 3001!');
});

module.exports.handler = serverless(app);
