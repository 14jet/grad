const nodemailer = require("nodemailer");

function main(config) {
  const port = Number(process.env.MAIL_CONFIG_PORT);

  let transporter = nodemailer.createTransport({
    // host: process.env.MAIL_CONFIG_HOST,
    service: "gmail",
    auth: {
      user: process.env.MAIL_CONFIG_AUTH_USER,
      pass: process.env.MAIL_CONFIG_AUTH_PASSWORD,
    },
  });

  // send mail with defined transport object
  return new Promise(async (res, rej) => {
    try {
      await transporter.sendMail({
        from: process.env.MAIL_CONFIG_FROM, // sender address
        to: config.to, // list of receivers
        subject: config.subject, // Subject line
        text: config.text, // plain text body
        html: config.html, // html body
      });
      return res(true);
    } catch (error) {
      return rej(error);
    }
  });
}

module.exports = { main };
