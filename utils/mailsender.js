var nodemailer = require('nodemailer');
const mailsender = async (email,title,body)=>{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'asthachaurasia272006@gmail.com',
    pass: 'zntfpbdupblwasfo'
  }
});

var mailOptions = {
  from: 'Astha Chaurasia <asthachaurasia272006@gmail.com>',
  to: `${email}`,
  subject: `${title}`,
  text: `${body}`,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});}
module.exports =mailsender;