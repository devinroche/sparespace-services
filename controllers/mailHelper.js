const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const mongoose = require('mongoose');

module.exports = {
	sendEmailVerify(email, u_id) {
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
			html: `<p>Click <a href='http://localhost:3001/verify/${u_id}'>Here</a> to verify your account</p>`,
		};

		smtpTransport.sendMail(mailOptions, (error, response) => {
			smtpTransport.close();

			return error, response
		});
	},
};