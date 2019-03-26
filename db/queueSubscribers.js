const aws = require('aws-sdk');
const series = require('async/series');
const users = require('./user');

const sqs = new aws.SQS({
  region: 'us-east-1'
});

const queueSubscribers = () => {
  // Get users
  users.getEmailList((allUsers) => {
    const emailList = [];
    const asyncOps = [];
    allUsers.forEach(user => emailList.push(user.email));
    // Send messages in batches of 10
    for (var i = 0; i < emailList.length; i += 10) {
      const sqsBatch = emailList.slice(i, i+10);
      for (var j = 0; j < sqsBatch.length; j++) {
        sqsBatch[j] = {
          Id: `${i + j}`,
          MessageBody: sqsBatch[j],
          DelaySeconds: 0,
          MessageDeduplicationId: sqsBatch[j],
          MessageGroupId: 'allSubscribers'
        };
      }

      const params = {
        Entries: sqsBatch,
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/482796003228/RedditByEmailDistribution.fifo',
      }

      asyncOps.push((doneOp) => {
        sqs.sendMessageBatch(params, function(err, data) {
          if (err) console.log(err, err.stack);
          else {
            console.log(`Sent SQS email list batch starting with ID ${params.Entries[0].Id}`);
            doneOp();
          }
        });
      });
    }

    series(asyncOps);
  });
};

module.exports = queueSubscribers;
