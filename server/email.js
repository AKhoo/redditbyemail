const nodemailer = require('nodemailer');
const juice = require('juice');
const Bottleneck = require('bottleneck');
const series = require('async/series');
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

  // For each user, get their posts by sub and render email component
  User.getAll((users) => {
    const asyncOps = [];
    users.forEach((user) => {
      asyncOps.push((doneOp) => {
        User.getPostsBySubCollection(user.email, (allPosts) => {
          const firstSub = Object.keys(allPosts)[0];
          let topPost = allPosts[firstSub][0].title;
          if (topPost.length > 147) {
            topPost = `${topPost.slice(0, 148)}...`;
          }
          let juicedEmail = '';
          styledEmail(user.email, Object.entries(allPosts), (html, css) => {
            juicedEmail = juice(`
              <style id="jss-server-side">${css}</style>
              <body>${html}</body>
            `);
          });
          
          const mailOptions = {
            from: 'Reddit By Email <noreply@redditbyemail.com>',
            to: user.email,
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
                doneOp();
              } else {
                console.log(`Email sent to ${user.email}`);
                doneOp();
              }
            });
          });
        });
      });
    });
    series(asyncOps, doneFunc);
  });
};
