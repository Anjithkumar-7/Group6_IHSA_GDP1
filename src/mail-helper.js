// https://github.com/eladnava/mailgen
//https://mailtrap.io/blog/send-emails-with-nodejs/
// https://forwardemail.net/en/guides/send-mail-as-gmail-custom-domain
// https://forwardemail.net/en/docs/send-emails-with-node-js-javascript
// var nodemailer = require('nodemailer');
// var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//         user: 'yourusername@gmail.com',
//         pass: 'yourpassword'
//     }
// });

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});




function sendEmail(mailOptions){

    // var mailOptions = {
    //   from: 'youremail@gmail.com',
    //   to: 'myfriend@yahoo.com',
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!'
    // };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}
// module.exports = sendEmail;

// export default sendEmail
module.exports ={
    sendEmail
}