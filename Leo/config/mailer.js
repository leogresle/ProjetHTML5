const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Vous pouvez utiliser un autre service d'email si nécessaire
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé');
  } catch (error) {
    console.error('Erreur lors de l\'envoi du mail :', error);
  }
};

module.exports = sendEmail;
