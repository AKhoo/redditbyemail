const aws = require('aws-sdk');

const sqs = new aws.SQS({
  region: 'us-east-1'
});

const testQueues = () => {
  // Get users
  // Send messages in batches of 10
  // Send message
  var params = {
    MessageBody: 'George',
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/482796003228/RedditByEmailDistribution.fifo',
    DelaySeconds: 0,
    MessageDeduplicationId: 'George',
    MessageGroupId: 'allSubscribers'
  };
  sqs.sendMessage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}

module.exports = testQueues;
