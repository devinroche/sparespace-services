const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const mongoose = require('mongoose');

module.exports = {
	async sendEmailVerify(email) {
		const smtpTransport = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASS,
			},
		});
		
		let user = await User.findOne({'contact.email': email}, "_id")
		console.log(user._id)

		const mailOptions = {
			to: email,
			subject: 'Sparespace Verification',
			text: 'fart',
			html: `<p>Click <a href='http://localhost:3001/verify/${user._id}'>Here</a> to verify your account</p>`,
		};

		smtpTransport.sendMail(mailOptions, (error, response) => {
			smtpTransport.close();
			console.log(response)

			return error, response
		});
	},
};