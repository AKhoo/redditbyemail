const nodemailer = require('nodemailer');
const env = require('../.env');

const transport = nodemailer.createTransport({
  host: 'email-smtp.us-west-2.amazonaws.com',
  secureConnection: true,
  port: 465,
  auth: {
    user: env.smtpUser,
    pass: env.smtpPassword,
  },
});

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
