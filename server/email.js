const juice = require('juice');
const Bottleneck = require('bottleneck');
const series = require('async/series');
const aws = require('aws-sdk');
const htmlToText = require('html-to-text');
const User = require('../db/user');
const styledEmail = require('../client/dist/bundle-ssr');

module.exports.handler = (event, context, doneFunc) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const sesController = new Bottleneck({
    minTime: 60,
  });

  const emailNewUser = (emailAddress, callback) => {
    const body_text = `
Thank you for subscribing to Reddit By Email!
  
If this email landed in your primary Inbox, you're good to go; no further action is required.
  
If this email landed in your Spam folder, please whitelist us in order to receive our emails properly going forward (for example, by marking this email as 'Not Spam').

If you're using Gmail and this email landed in your Promotions tab, please drag our email to your Primary tab if you would like us to appear there instead.

We hope you'll enjoy Reddit By Email!

P.S. In case you're wondering, our emails are set to go out around 6am Pacific Time / 9am Eastern Time daily :)
    `;
    const charset = 'UTF-8';
    const ses = new aws.SES({
      region: 'us-east-1'
    });
    const params = {
      Source: 'Reddit By Email <noreply@redditbyemail.com>', 
      Destination: { 
        ToAddresses: [emailAddress],
      },
      Message: {
        Subject: {
          Data: 'Did We Land in Your Spam? If Yes, Whitelist Us',
          Charset: charset
        },
        Body: {
          Text: {
            Data: body_text,
            Charset: charset 
          },
        }
      },
    };

    ses.sendEmail(params, function(err, data) {
      if(err) {
        console.log(err.message);
        callback();
      } else {
        console.log(`Email sent to ${emailAddress}. Message ID: ${data.MessageId}.`);
        callback();
      }
    });
  };

  const emailNewsletter = (emailAddress, callback) => {
    User.getPostsBySubCollection(emailAddress, (allPosts) => {
      console.log('Finished getting all posts for user. Formulating email title.')
      const firstSub = Object.keys(allPosts)[0];
      let topPost = allPosts[firstSub][0].title;
      if (topPost.length > 147) {
        topPost = `${topPost.slice(0, 148)}...`;
      }
      console.log('Formulated email title. Creating HTML email with React renderToString.')
      let juicedEmail = '';
      styledEmail(emailAddress, Object.entries(allPosts), (html, css) => {
        console.log('React renderToString complete. Injecting CSS using Juice.')
        juicedEmail = juice(`
          <!doctype html>
          <html lang="en">
          <head>
            <style id="jss-server-side">${css}</style>
          </head>
          <body>${html}</body>
          </html>
        `);
        console.log('CSS injection via Juice complete. Next step is to send email.')
      });

      const charset = 'UTF-8';
      const ses = new aws.SES({
        region: 'us-west-2'
      });
      const params = {
        Source: 'Reddit By Email <noreply@redditbyemail.com>', 
        Destination: { 
          ToAddresses: [emailAddress],
        },
        Message: {
          Subject: {
            Data: topPost,
            Charset: charset
          },
          Body: {
            Text: {
              Data: htmlToText.fromString(juicedEmail),
              Charset: charset 
            },
            Html: {
              Data: juicedEmail,
              Charset: charset
            }
          }
        },
        ConfigurationSetName: 'redditbyemail-daily-newsletter',
      };

      sesController.schedule(() => {
        ses.sendEmail(params, function(err, data) {
          if(err) {
            console.log(err.message);
            callback();
          } else {
            console.log(`Email sent to ${emailAddress}. Message ID: ${data.MessageId}.`);
            callback();
          }
        });
      });
    });
  };

  console.log(event);

  if (event.newSubscriber) {
    emailNewUser(event.newSubscriber, doneFunc);
  } else {
    // For each user, get their posts by sub and render email component  
    User.getAll((users) => {
      const asyncOps = [];
      users.forEach((user) => {
        asyncOps.push((doneOp) => {
          emailNewsletter(user.email, doneOp);
        });
      });
      series(asyncOps, doneFunc);
    });
  }
};
