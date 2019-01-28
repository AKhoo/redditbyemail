const nodemailer = require('nodemailer');
const env = require('../.env');
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

// For each user
  // Get their relevant posts
  // Format to shape expected by Email component
  // Render email component

const mailOptions = {
  from: "Adrian <adriankhoo.ca@gmail.com>", // sender address
  to: "Adrian <adriankhoo.ca@gmail.com>", // list of receivers
  subject: "Test Subject", // Subject line
  html: "<b>TEST BODY!!</b>" // email body
};

transport.sendMail(mailOptions, (error, response) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Message sent: " + response.message);
  }

  transport.close(); // shut down the connection pool, no more messages
});
