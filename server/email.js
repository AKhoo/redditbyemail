const nodemailer = require('nodemailer');
const juice = require('juice');
const Bottleneck = require('bottleneck');
const series = require('async/series');
const aws = require('aws-sdk');
const htmlToText = require('nodemailer-html-to-text').htmlToText;
const env = require('../.env');
const User = require('../db/user');
const styledEmail = require('../client/dist/bundle-ssr');

module.exports.handler = (event, context, doneFunc) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const sesController = new Bottleneck({
    minTime: 60,
  });

  const transport = nodemailer.createTransport({
    host: 'email-smtp.us-west-2.amazonaws.com',
    secureConnection: true,
    port: 465,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPassword,
    },
  });

  transport.use('compile', htmlToText());

  const emailNewUser = (emailAddress, callback) => {
    const sender = 'Reddit By Email <noreply@redditbyemail.com>';
    const recipient = emailAddress;
    const subject = 'Did We Land in Your Spam? If Yes, Whitelist Us';
    const body_text = `
    Thank you for subscribing to Reddit By Email!
      
    If this email landed in your primary Inbox, you're good to go; no further action is required.
      
    If this email landed in your Spam folder, please whitelist us in order to receive our emails properly going forward (for example, by marking this email as 'Not Spam').

    If you're using Gmail and this email landed in your Promotions tab, please drag our email to your Primary tab if you would like us to appear there instead.

    We hope you'll enjoy Reddit By Email!

    P.S. In case you're wondering, our emails are set to go out around 6am Pacific Time / 9am Eastern Time daily :)
    `;
    const charset = 'UTF-8';
    const ses = new aws.SES();
    const params = {
      Source: sender, 
      Destination: { 
        ToAddresses: [
          recipient
        ],
      },
      Message: {
        Subject: {
          Data: subject,
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
      // If something goes wrong, print an error message.
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
      
      const mailOptions = {
        from: 'Reddit By Email <noreply@redditbyemail.com>',
        to: emailAddress,
        subject: topPost,
        headers: {
          'X-SES-CONFIGURATION-SET': 'redditbyemail-daily-newsletter',
        },
        html: juicedEmail,
      };

      sesController.schedule(() => {
        transport.sendMail(mailOptions, (error, response) => {
          if (error) {
            console.log(error);
            callback();
          } else {
            console.log(`Email sent to ${emailAddress}`);
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
