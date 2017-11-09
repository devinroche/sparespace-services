const nodemailer = require('nodemailer');

module.exports = {
	verifyEmail(email, userId) {
		const smtpTransport = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASS,
			},
		});
		
		const mailOptions = {
			to: email,
			subject: 'Sparespace Verification',
			text: 'fart',
			html: `<p>Click <a href='http://localhost:3001/verify/${userId}'>Here</a> to verify your account</p>`,
		};

		smtpTransport.sendMail(mailOptions, (error, response) => {
			smtpTransport.close();

			return error, response
		});
	},
};