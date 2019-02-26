const nodemailer = require('nodemailer');
const juice = require('juice');
const Bottleneck = require('bottleneck');
const series = require('async/series');
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
    const mailOptions = {
      from: 'Reddit By Email <noreply@redditbyemail.com>',
      to: emailAddress,
      subject: 'Did We Land in Your Spam? If Yes, Whitelist Us!',
      text: `
      Thank you for subscribing to Reddit By Email!
        
      If this email landed in your inbox, you're good to go; no further action is required.
        
      If this email landed in your Spam folder, please whitelist us in order to receive our emails properly going forward (for example, by marking this email as 'Not Spam').

      We hope you'll enjoy Reddit By Email!

      P.S. In case you're wondering, our emails are set to go out around 6am Pacific Time / 9am Eastern Time daily :)
      `,
    };

    transport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
        callback();
      } else {
        console.log(`Email sent to ${emailAddress}`);
        callback();
      }
    });
  };

  const emailNewsletter = (emailAddress, callback) => {
    User.getPostsBySubCollection(emailAddress, (allPosts) => {
      const firstSub = Object.keys(allPosts)[0];
      let topPost = allPosts[firstSub][0].title;
      if (topPost.length > 147) {
        topPost = `${topPost.slice(0, 148)}...`;
      }
      let juicedEmail = '';
      styledEmail(emailAddress, Object.entries(allPosts), (html, css) => {
        juicedEmail = juice(`
          <!doctype html>
          <html lang="en">
          <head>
            <style id="jss-server-side">${css}</style>
          </head>
          <body>${html}</body>
          </html>
        `);
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
