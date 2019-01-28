const nodemailer = require('nodemailer');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const env = require('../.env');
const User = require('../db/user');
const Email = require('../client/dist/bundle-ssr');

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
      const randomTopPost = allPosts[randomSub][0].title;
      console.log('Random Top Post:', randomTopPost);
      const email = React.createElement(Email, { categoriesSelected: Object.entries(allPosts) });

      const mailOptions = {
        from: "Reddit By Email <adriankhoo.ca@gmail.com>", // sender address
        to: "Adrian <adriankhoo.ca@gmail.com>", // list of receivers
        subject: randomTopPost, // Subject line
        html: ReactDOMServer.renderToString(email), // email body
      };

      transport.sendMail(mailOptions, (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent: " + response.message);
        }
      });
    })
  })
})
  // Get their relevant posts
  // Format to shape expected by Email component
  // Render email component

  // transport.close(); // shut down the connection pool, no more messages
