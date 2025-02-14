const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, token) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.token = token;
    this.from = process.env.Email_Username;
  }
  newTransport() {
    
    return nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: process.env.Email_Username,
        pass: process.env.Email_Password,
        
      },
    });
  }
  async send(subject) {
    
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html:`<h1>Your password reset otp is ${this.token}</h1>`,
    };

   
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome to the natours family');
  }
  async sendPasswordReset(){
    await this.send('Your password reset token. (Valid only for 10 minutes)')
  }
};