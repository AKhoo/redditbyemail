const nodemailer = require('nodemailer');
const juice = require('juice');
const env = require('../.env');
const User = require('../db/user');
const styledEmail = require('../client/dist/bundle-ssr');
const Bottleneck = require('bottleneck');

const sesController = new Bottleneck({
  minTime: 1500,
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
  users.forEach((user) => {
    User.getPostsBySubCollection(user.email, (allPosts) => {
      const randomSub = Object.keys(allPosts)[Math.floor(Math.random() * Object.keys(allPosts).length)];
      let titlePrefix = randomSub;
      if (Object.keys(allPosts).length > 1) {
        titlePrefix += ' & More';
      }
      let randomTopPost = allPosts[randomSub][0].title;
      if (randomTopPost.length > 147) {
        randomTopPost = `${randomTopPost.slice(0, 148)}...`;
      }
      let juicedEmail = '';
      styledEmail(Object.entries(allPosts), (html, css) => {
        juicedEmail = juice(`
          <style id="jss-server-side">${css}</style>
          <body>${html}</body>
        `);
      });

      const mailOptions = {
        from: `Reddit By Email <adriankhoo.ca@gmail.com>`,
        to: user.email,
        subject: `${titlePrefix}: ${randomTopPost}`,
        html: juicedEmail,
      };

      sesController.schedule(() => {
        transport.sendMail(mailOptions, (error, response) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent to ${user.email}`);
          }
        });
      })
    })
  })
})
